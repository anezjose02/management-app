import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { id, cedula, nombre, patrono, razonSocial, tel1, tel2, salario, active, userId } = req.body;
        try {
            const data = id
                ? await prisma.formData.update({
                    where: { id: Number(id) },
                    data: {
                        cedula,
                        nombre,
                        patrono,
                        razonSocial,
                        tel1,
                        tel2,
                        salario,
                        active: Boolean(active),
                        updated_at: new Date(),
                    },
                })
                : await prisma.formData.create({
                    data: {
                        cedula,
                        nombre,
                        patrono,
                        razonSocial,
                        tel1,
                        tel2,
                        salario,
                        active: Boolean(active),
                        created_at: new Date(),
                        user_id: Number(userId), 
                    },
                });

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}
