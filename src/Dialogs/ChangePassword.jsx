import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, Typography, Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPasswordUser } from '../Services/UserService';
import './dialogs.css';

export default function ChangePasswordDialog(props) {

    const userId = localStorage.getItem('userId');
    const formik = useFormik({
        initialValues: {
            passwordOld: "",
            newPassword: "",
            RePassword: "",
        },
        validationSchema: Yup.object({
            passwordOld: Yup.string()
                .min(6, "Tối thiểu 6 ký tự")
                .required("Trường này là băt buộc!"),
            newPassword: Yup.string()
                .min(6, "Tối thiểu 6 ký tự")
                .required("Trường này là băt buộc!"),
            RePassword: Yup.string()
                .min(6, "Tối thiểu 6 ký tự")
                .required("Trường này là băt buộc!"),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            if(values.newPassword !== values. RePassword) {
                toast.warning("Vui lòng nhập lại mật khẩu mới chính xác!");
                return;
            }; 
            let data = {
                password_old: values.passwordOld,
                user_id: userId,
                new_password: values.newPassword
            };
    
            resetPasswordUser((rs) => {
                if(rs.statusCode === 200) {
                    toast.success("Thay đổi mật khẩu thành công!");
                    props.handleClose();
                    resetForm();
                } else {
                    toast.error(rs.message);
                }
            }, data);
        },
    });

    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogContent className='dialog-change-password'>
                    <Typography variant='h3' sx={{ textAlign: 'center', fontSize: '2rem' }}>Thay đổi mật khẩu</Typography>
                    <Grid container sx={{ marginTop: "2rem" }}>
                        <Grid item xs={3} display="flex" alignItems="center">
                            <Typography
                                sx={{
                                    alignSelf: 'center',
                                    fontWeight: '600',
                                    fontSize: '1.2rem',
                                }}>
                                Mật khẩu cũ
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    width: '100%',
                                    borderRadius: '5px'
                                }}
                            >
                                <input
                                    name="passwordOld"
                                    type='password'
                                    style={{ border: "none", width: "100%", padding: '12px 16px', outline: "none" }}
                                    onChange={formik.handleChange}
                                    value={formik.values.passwordOld}
                                />
                            </Box>
                            {formik.errors.passwordOld && formik.touched.passwordOld && (
                                <div className="form-error mt-2">{formik.errors.passwordOld}</div>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: "2rem" }}>
                        <Grid item xs={3} display="flex" alignItems="center">
                            <Typography
                                sx={{
                                    alignSelf: 'center',
                                    fontWeight: '600',
                                    fontSize: '1.2rem',
                                }}>
                                Mật khẩu mới
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    width: '100%',
                                    borderRadius: '5px'
                                }}
                            >
                                <input
                                    name="newPassword"
                                    type='password'
                                    style={{ border: "none", width: "100%", padding: '12px 16px', outline: "none" }}
                                    onChange={formik.handleChange}
                                    value={formik.values.newPassword}
                                />
                            </Box>
                            {formik.errors.newPassword && formik.touched.newPassword && (
                                <div className="form-error mt-2">{formik.errors.newPassword}</div>
                            )}
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: "2rem" }}>
                        <Grid item xs={3} display="flex" alignItems="center">
                            <Typography
                                sx={{
                                    alignSelf: 'center',
                                    fontWeight: '600',
                                    fontSize: '1.2rem',
                                }}>
                                Nhập lại mật khẩu
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '1px solid rgba(0,0,0,0.1)',
                                    width: '100%',
                                    borderRadius: '5px'
                                }}
                            >
                                <input
                                    name="RePassword"
                                    type='password'
                                    style={{ border: "none", width: "100%", padding: '12px 16px', outline: "none" }}
                                    onChange={formik.handleChange}
                                    value={formik.values.RePassword}
                                />
                            </Box>
                            {formik.errors.RePassword && formik.touched.RePassword && (
                                <div className="form-error mt-2">{formik.errors.RePassword}</div>
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={formik.handleSubmit}>Apply</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}