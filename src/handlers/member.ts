import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'

export const createNewMember = async (req, res) => {
  const user = await prisma.member.create({
    data: {
      email: req.body.email,
      password: await hashPassword(req.body.password)
    }
  })

  const token = createJWT(member)
  res.json({ token })
}

export const signin = async (req, res) => {
  const user = await prisma.member.findUnique({
    where: {
      email: req.body.email
    }
  })

  const isValid = await comparePasswords(req.body.password, member.password)

  if (!isValid) {
    res.status(401)
    res.json({message: 'nope'})
    return
  }

  const token = createJWT(member)
  res.json({ token })
}
