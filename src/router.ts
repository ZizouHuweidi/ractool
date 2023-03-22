import { Router } from 'express'
import { body, oneOf, validationResult } from "express-validator"
import { deleteMember, getOneMember, getMembers, updateMember } from './controllers/member'
import { createActivity, deleteActivity, getOneActivity, getActivities, updateActivity } from './controllers/activity'
// import { createAttendance, deleteAttendance, getOneAttendance, getAttendances, updateAttendance } from './handlers/attendance'
import { handleInputErrors } from './modules/middleware'

const router = Router()

/**
 * Member
 */
router.get('/member', getMembers)
router.get('/member/:id', getOneMember)
router.patch('/member/:id', updateMember)
router.delete('/member/:id', deleteMember)

/**
 * Activity
 */

router.post('/activity', createActivity)
router.get('/activity', getActivities)
router.get('/activity/:id', getOneActivity)
router.patch('/activity/:id', updateActivity)
router.delete('/activity/:id', deleteActivity)

/**
 * Attendance
 */

// router.post('/activity', createActivity)
// router.get('/activity', getActivities)
// router.get('/activity/:id', getOneActivity)
// router.patch('/activity/:id', updateActivity)
// router.delete('/activity/:id', deleteActivity)



/**
 * Reciepts
 */
// router.post('/activity', createActivity)
// router.get('/activity', getActivities)
// router.get('/activity/:id', getOneActivity)
// router.patch('/activity/:id', updateActivity)
// router.delete('/activity/:id', deleteActivity)

export default router
