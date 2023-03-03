import { Router } from 'express'
import { body, oneOf, validationResult } from "express-validator"
import { deleteMember, getOneMember, getMembers, updateMember } from './handlers/member'
// import { createActivity, deleteActivity, getOneActivity, getActivities, updateActivity } from './handlers/activity'
// import { createAttendance, deleteAttendance, getOneAttendance, getAttendances, updateAttendance } from './handlers/attendance'
import { handleInputErrors } from './modules/middleware'

const router = Router()

/**
 * Member
 */
router.get('/member', getMembers)
router.get('/member/:id', getOneMember)
router.put('/member/:id', body('name').isString(), handleInputErrors, (req, res) => {

})
router.post('/member', body('name').isString(), handleInputErrors, updateMember)
router.delete('/member/:id', deleteMember)

/**
 * Activity
 */

// router.get('/activity', getActivities)
// router.get('/activity/:id', getOneActivity)
// router.put('/activity/:id',
//   body('title').optional(),
//   body('body').optional(),
//   body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
//   body('version').optional(),
//   updateActivity
// )
// router.post('/activity',
//   body('title').exists().isString(),
//   body('body').exists().isString(),
//   body('activityId').exists().isString(),
//   createActivity
// )
// router.delete('/activity/:id', deleteActivity)

/**
 * Attendance
 */

// router.get('/attendance', () => { })
// router.get('/attendance/:id', () => { })
// router.put('/attendance/:id',
//   body('name').optional().isString(),
//   body('description').optional().isString(),
//   () => { }
// )
// router.post('/updatepoint',
//   body('name').isString(),
//   body('description').isString(),
//   body('updateId').exists().isString(),
//   () => { }
// )
// router.delete('/updatepoint/:id', () => { })



/**
 * Reciepts
 */

export default router
