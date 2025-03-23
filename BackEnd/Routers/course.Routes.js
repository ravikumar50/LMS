import {Router} from 'express';
import {getAllCourses, getLectureByCourseId, createCourse, updateCourse, removeCourse,addLectureToCourseById,deleteLectureToCourseAndLectureId} from '../Controllers/course.Controller.js';
import {isLoggedIn, authorizedRoles, authorizedSubscriber} from '../Middlewares/auth.Middleware.js';
import upload from '../Middlewares/multer.Middleware.js';


const router = Router();

router.get('/',authorizedRoles('ADMIN'),getAllCourses);
router.post('/createCourse',isLoggedIn, authorizedRoles('ADMIN'), upload.single('thumbnail'),createCourse);
router.get('/:id',isLoggedIn, authorizedSubscriber, getLectureByCourseId);
router.put('/updateCourse/:id',isLoggedIn, authorizedRoles('ADMIN'), updateCourse);
router.delete('/deleteCourse/:id',isLoggedIn, authorizedRoles('ADMIN'), removeCourse);
router.post('/addLecture/:id',isLoggedIn, authorizedRoles('ADMIN'), upload.single('lecture'), addLectureToCourseById);
router.delete('/deleteLecture/:courseId/:lectureId', isLoggedIn, authorizedRoles('ADMIN'), deleteLectureToCourseAndLectureId);

export default router;