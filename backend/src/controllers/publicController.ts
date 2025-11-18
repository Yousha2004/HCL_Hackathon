import { Request, Response } from 'express';
import HealthTip from '../models/HealthTips';

/**
 * @desc    Get a random health tip
 * @route   GET /api/public/tips
 * @access  Public
 */

export const getHealthTip = async (req: Request, res: Response) => {
  try {

    const tips = await HealthTip.aggregate([{ $sample: { size: 1 } }]);

    if (!tips || tips.length === 0) {

      return res.status(404).json({ msg: 'No health tips found.' });
    }


    res.status(200).json(tips[0]);

  } catch (error) {
    console.error('Error fetching health tip:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};