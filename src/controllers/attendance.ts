import prisma from "../db"

export const takeAttendance = async (req, res) => {
  const { activityId, memberId, attended } = req.body
  try {
    const attendance = await prisma.attendance.create({
      data: {
        member: { connect: { id: memberId } },
        activity: { connect: { id: activityId } },
        attended: attended
      },
    })
    res.status(201).json(attendance)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}



export const getAttendance = async (req, res) => {
  try {
    const response = await prisma.attendance.findMany()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

// export const getEventAttendance = async (req, res) => {
//   const { activityId } = req.params;
//   try {
//     const response = await prisma.attendance.findUnique({
//       where: {
//         activityId: Number(activityId),
//       },
//     })
//     res.status(200).json(response)
//   } catch (error) {
//     res.status(404).json({ msg: error.message })
//   }
// }


// export const getMemberAttendance = async (req, res) => {
//   try {
//     const response = await prisma.attendance.findMany({
//       where: {
//         id: req.params.memberId,
//       },
//     })
//     res.status(200).json(response)
//   } catch (error) {
//     res.status(404).json({ msg: error.message })
//   }
// }


// export const updateAttendance = async (req, res) => {
//   const { name, description, location, date, type } = req.body
//   try {
//     const activity = await prisma.attendance.update({
//       where: {
//         id: Number(req.params.id),
//       },
//       data: {
//         name: name,
//         description: description,
//         location: location,
//         date: date,
//         type: type
//       },
//     })
//     res.status(200).json(attendance)
//   } catch (error) {
//     res.status(400).json({ msg: error.message })
//   }
// }

export const deleteAttendance = async (req, res) => {
  try {
    const attendance = await prisma.attendance.delete({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json(attendance)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}
