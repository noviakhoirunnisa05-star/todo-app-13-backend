import { Request, Response } from 'express';
import { TodoModel } from '../models/todoModel';

export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
  const userId = res.locals.userId;
  try {
    const todos = await TodoModel.getByUserId(userId);
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil daftar tugas.' });
  }
};

export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const todo = await TodoModel.getById(Number(id), userId);
    if (!todo) {
      res.status(404).json({ success: false, message: 'Tugas tidak ditemukan!' });
      return;
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil detail tugas.' });
  }
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  const { task } = req.body;
  const userId = res.locals.userId;

  try {
    const newId = await TodoModel.create(task, userId);
    res.status(201).json({
      success: true,
      message: 'Tugas berhasil ditambahkan!',
      data: { id: newId, task, is_completed: 0 }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal menambahkan tugas.' });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { task, is_completed } = req.body;
  const userId = res.locals.userId;

  try {
    const todo = await TodoModel.getById(Number(id), userId);
    if (!todo) {
      res.status(404).json({ success: false, message: 'Tugas tidak ditemukan!' });
      return;
    }

    await TodoModel.update(Number(id), task, is_completed, userId);
    res.status(200).json({ success: true, message: 'Tugas berhasil diperbarui!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal memperbarui tugas.' });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = res.locals.userId;

  try {
    const todo = await TodoModel.getById(Number(id), userId);
    if (!todo) {
      res.status(404).json({ success: false, message: 'Tugas tidak ditemukan!' });
      return;
    }

    await TodoModel.delete(Number(id), userId);
    res.status(200).json({ success: true, message: 'Tugas berhasil dihapus!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal menghapus tugas.' });
  }
};