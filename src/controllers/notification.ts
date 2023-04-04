import prisma from "../db"

//implement send push notification upon creating notification
export const createNotification = async (req, res) => {
  const { title, content } = req.body
  try {
    const notification = await prisma.notification.create({
      data: {
        title: title,
        content: content,
      },
    });
    res.status(201).json(notification)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

export const getNotifications = async (req, res) => {
  try {
    const response = await prisma.notification.findMany()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const getOneNotification = async (req, res) => {
  try {
    const response = await prisma.notification.findUnique({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ msg: error.message })
  }
}


export const updateNotification = async (req, res) => {
  const { title, content } = req.body
  try {
    const notification = await prisma.notification.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title: title,
        content: content,
      },
    })
    res.status(200).json(notification)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

export const deleteNotification = async (req, res) => {
  try {
    const notification = await prisma.notification.delete({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json(notification)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}
