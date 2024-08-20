import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import DataTableComponent from './components/DataTableComponent';
import DataForm from './components/DataForm';
import DataDetails from './components/DataDetails';
import { Row, Col, Button } from 'react-bootstrap';
import { FaPlus, FaChartLine } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';
import Swal from 'sweetalert2';  

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewingData, setViewingData] = useState(null);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!session) {
      router.push('/auth/signin');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('/api/form-data');
        const result = await response.json();
        
        if (Array.isArray(result)) {
          setData(result);
        } else {
          console.error('Expected an array but got:', result);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const handleSaveData = (newData) => {
    if (editingData) {
      setData(data.map(item => (item.cedula === editingData.cedula ? newData : item)));
      Swal.fire('Success', 'Data modified successfully', 'success');  
    } else {
      setData([...data, newData]);
      Swal.fire('Success', 'Data added successfully', 'success'); 
    }
    setShowForm(false);
  };

  const handleEdit = (row) => {
    setEditingData(row);
    setShowForm(true);
  };

  const handleView = (row) => {
    setViewingData(row);
  };

  const handleCancel = () => {
    setEditingData(null);
    setShowForm(false);
  };

  const handleBack = () => {
    setViewingData(null);
  };

  const handleShowChart = () => {
    setShowChart(true);
  };

  const handleHideChart = () => {
    setShowChart(false);
  };

  const chartData = {
    labels: Array.isArray(data) ? data.map(item => new Date(item.created_at).toLocaleDateString()) : [],
    datasets: [
      {
        label: 'Salario',
        data: Array.isArray(data) ? data.map(item => parseFloat(item.salario)) : [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat().format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <div className="container mt-3">
          {showForm ? (
            <DataForm
              initialData={editingData}
              saveData={handleSaveData}
              onCancel={handleCancel}
              userId={session.user.id}
            />
          ) : viewingData ? (
            <DataDetails data={viewingData} onBack={handleBack} />
          ) : showChart ? (
            <div>
              <Button variant="secondary" onClick={handleHideChart}>
                Hide Chart
              </Button>
              <div className="mt-3 chart-container">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          ) : (
            <>
              <Row className="mb-3">
                <Col className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    className="me-2 d-flex align-items-center"
                    style={{ whiteSpace: 'nowrap' }}
                    onClick={() => setShowForm(true)}
                  >
                    <FaPlus className="me-1" /> 
                    Go to form
                  </Button>
                  <Button
                    variant="info"
                    className="d-flex align-items-center"
                    style={{ whiteSpace: 'nowrap' }}
                    onClick={handleShowChart}
                  >
                    <FaChartLine className="me-1" /> 
                    View Chart
                  </Button>
                </Col>
              </Row>
              <DataTableComponent data={data} onEdit={handleEdit} onView={handleView} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
