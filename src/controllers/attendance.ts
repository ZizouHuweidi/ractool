import prisma from "../db"

export const takeAttendance = async (req, res) => {
  const { memberId, status } = req.body
  const { activityId } = req.body
  try {
    const attendance = await prisma.attendance.create({
      data: {
        member: { connect: { id: memberId } },
        activity: { connect: { id: activityId } },
        status: status,
      },
    })
    res.status(201).json(attendance)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}



export const getAllAttendance = async (req, res) => {
  try {
    const response = await prisma.attendance.findMany()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const getActivityAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.attendance.findMany({
      where: {
        activityId: Number(id),
      },
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ msg: error.message })
  }
}


export const getMemberAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.attendance.findMany({
      where: {
        memberId: Number(id),
      },
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ msg: error.message })
  }
}


export const updateAttendance = async (req, res) => {
  const { status, memberId } = req.body
  try {
    const attendance = await prisma.attendance.updateMany({
      where: {
        activityId: Number(req.params.id),
        memberId: memberId
      },
      data: {
        status: status,
      },
    })
    res.status(201).json(attendance)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

export const deleteAttendance = async (req, res) => {
  try {
    const attendance = await prisma.attendance.delete({
      where: {
        activityId: Number(req.params.id),
      },
    })
    res.status(200).json(attendance)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}
