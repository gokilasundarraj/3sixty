import Callback from '../models/Callback.js';
import { successResponse, errorResponse } from '../common/responseHelper.js';
import { validateName } from '../common/validators.js';

export const createCallback = async (req, res, next) => {
  try {
    const { name, phone, email, projectType, message } = req.body;

    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      return errorResponse(res, nameValidation.error || 'Please enter a valid full name.', 400);
    }

    if (!phone || !projectType) {
      return errorResponse(res, 'Phone number and project type are required.', 400);
    }

    const cleanPhone = String(phone || '').replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return errorResponse(res, 'Please provide a valid 10-digit phone number.', 400);
    }

    const callback = await Callback.create({
      name: name.trim(),
      phone: cleanPhone,
      email: email ? email.toLowerCase().trim() : '',
      projectType,
      message: message ? message.trim() : '',
      status: 'new',
    });

    return successResponse(res, callback, 'Call back request registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getAllCallbacks = async (req, res, next) => {
  try {
    const callbacks = await Callback.find().sort({ createdAt: -1 });
    return successResponse(res, callbacks);
  } catch (error) {
    next(error);
  }
};

export const updateCallbackStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'contacted', 'completed'].includes(status)) {
      return errorResponse(res, 'Invalid callback status', 400);
    }

    const callback = await Callback.findByIdAndUpdate(id, { status }, { new: true });
    if (!callback) {
      return errorResponse(res, 'Callback request not found', 404);
    }

    return successResponse(res, callback, `Status updated to ${status}`);
  } catch (error) {
    next(error);
  }
};
