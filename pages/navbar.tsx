import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className="p-3 mb-3 border-bottom bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a href="/" className="navbar-brand">Management App</a>
        <div className="dropdown text-end">
          <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            {session?.user?.name || 'User'}
          </a>
          <ul className="dropdown-menu text-small">
            <li><a className="dropdown-item" href="#" onClick={() => signOut()}>Sign out</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;