import prisma from "../db"

export const createReceipt = async (req, res) => {
  const { date, amount, memberId } = req.body
  try {
    const receipt = await prisma.receipt.create({
      data: {
        date: date,
        amount: amount,
        memberId: memberId,
      },
    });
    const member = await prisma.member.findFirst({
      where: { id: Number(memberId) },
    })
    const newPayment = member.membershipPaid + receipt.amount
    await prisma.member.update({
      where: {
        id: Number(memberId),
      },
      data: {
        membershipPaid: newPayment
      }
    })
    res.status(201).json(receipt)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

export const getReceipts = async (req, res) => {
  try {
    const response = await prisma.receipt.findMany()
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const getOneReceipt = async (req, res) => {
  try {
    const response = await prisma.receipt.findUnique({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({ msg: error.message })
  }
}


export const updateReceipt = async (req, res) => {
  const { date, amount, memberId } = req.body
  try {
    const oldReciept = await prisma.receipt.findUnique({
      where: {
        id: Number(req.params.id),
      },
    })
    const receipt = await prisma.receipt.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        date: date,
        amount: amount,
        memberId: memberId,
      },
    })
    const member = await prisma.member.findFirst({
      where: { id: Number(memberId) },
    })

    const amountDiff = amount - oldReciept.amount
    const newPayment = member.membershipPaid + amountDiff

    await prisma.member.update({
      where: {
        id: Number(memberId),
      },
      data: {
        membershipPaid: newPayment
      }
    })
    res.status(200).json(receipt)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

export const deleteReceipt = async (req, res) => {
  try {
    const oldReciept = await prisma.receipt.findUnique({
      where: {
        id: Number(req.params.id),
      },
    })
    const member = await prisma.member.findFirst({
      where: { id: Number(oldReciept.memberId) },
    })
    const newPayment = member.membershipPaid - oldReciept.amount
    await prisma.member.update({
      where: {
        id: Number(oldReciept.memberId),
      },
      data: {
        membershipPaid: newPayment
      }
    })

    const receipt = await prisma.receipt.delete({
      where: {
        id: Number(req.params.id),
      },
    })
    res.status(200).json(receipt)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}
