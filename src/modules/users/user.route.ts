import { Router } from 'express';
import * as UserController from './user.controller';
import { isAuthenticated } from '../../core/middleware/auth.middleware';
import validate from '../../core/middleware/validate.middleware';
import { changePasswordValidation, profileValidation, searchTermValidation } from './user.validation';

const router = Router();

router.use(isAuthenticated);

router.get('/me', UserController.getProfile);
router.post('/change-password', validate(changePasswordValidation), UserController.changePassword);
router.post('/me', validate(profileValidation), UserController.updateProfile);
router.get('/search/:searchTerm', validate(searchTermValidation), UserController.searchContacts);
router.get('/contacts', UserController.handleGetContactsFromDMList);

export default router;
