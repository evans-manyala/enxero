import express from 'express';
import authRoutes from '../modules/auth/routes/auth.routes';
import userRoutes from '../modules/users/routes/user.routes';
import roleRoutes from '../modules/roles/routes/role.routes';
import companyRoutes from '../modules/companies/routes/company.routes';
import employeeRoutes from '../modules/employees/routes/employee.routes';
import formRoutes from '../modules/forms/routes/form.routes';
import integrationRoutes from '../modules/integrations/routes/integration.routes';
import leaveRoutes from '../modules/leave/routes/leave.routes';
import notificationRoutes from '../modules/notifications/routes/notification.routes';
import auditRoutes from '../modules/audit/routes/audit.routes';
import systemRoutes from '../modules/system/routes/system.routes';
import payrollRoutes from '../modules/payroll/routes/payroll.routes';
import fileRoutes from '../modules/files/routes/file.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/companies', companyRoutes);
router.use('/employees', employeeRoutes);
router.use('/forms', formRoutes);
router.use('/integrations', integrationRoutes);
router.use('/leave', leaveRoutes);
router.use('/notifications', notificationRoutes);
router.use('/audit', auditRoutes);
router.use('/system', systemRoutes);
router.use('/payroll', payrollRoutes);
router.use('/files', fileRoutes);

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

export default router; 