import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'

export const createMember = async (req, res) => {
  const member = await prisma.member.create({
    data: {
      email: req.body.email,
      password: await hashPassword(req.body.password),
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      phone: req.body.phone,
      membershipFee: req.body.membershipFee,
      membershipPaid: req.body.membershipPaid,
    }
  })

  const token = createJWT(member)
  res.json({ token })
}

export const signin = async (req, res) => {
  const member = await prisma.member.findUnique({
    where: {
      email: req.body.email
    }
  })

  const isValid = await comparePasswords(req.body.password, member.password)

  if (!isValid) {
    res.status(401)
    res.json({ message: 'nope' })
    return
  }

  const token = createJWT(member)
  res.json({ token })
}

// Get all
export const getMembers = async (req, res) => {
  try {
    const member = await prisma.member.findMany()

    res.json(member)
  } catch (error) {
    res.status(500).json({
      message: "stinky poo poo"
    })
  }
}

// Get one
export const getOneMember = async (req, res) => {
  const id = req.params.id

  const member = await prisma.member.findUnique({
    where: {
      id: id
    }
  })

  res.json(member)
}


// Update one
export const updateMember = async (req, res) => {
  const { id } = req.params

  try {
    const memberData = await prisma.member.findUnique({
      where: { id: Number(id) },
    })

    const updatedMember = await prisma.member.update({
      where: { id: Number(id) || undefined },
      data: {
        password: req.body.password,
        phone: req.body.phone,
        membershipFee: req.body.membershipFee,
        membershipPaid: req.body.membershipPaid
      },
    })
    res.json(updatedMember)
  } catch (error) {
    res.json({ error: `Member with ID ${id} does not exist in the database` })
  }
}

// Delete one
export const deleteMember = async (req, res) => {
  const { id } = req.params
  const member = await prisma.member.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(member)
}
