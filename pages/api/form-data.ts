import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma'; 

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const userId = session.user.id;
  console.log('este es mi session user.id', userId)

  try {
    const formData = await prisma.formData.findMany({
      where: {
        user_id: Number(userId)
      }
    });
    res.status(200).json(formData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
