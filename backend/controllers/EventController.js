const Event = require('../models/Event')
const moment = require('moment')
const ObjectId = require('mongoose').Types.ObjectId.isValid
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class Events {
  ////////////// CRIAR EVENTO
  static async createEvent(req, res) {
    const { title, start, end, description } = req.body

    // validações
    if (!title) {
      res.status(422).json({ message: 'Insira um título do evento!' })
      return
    }
    if (!start) {
      res.status(422).json({ message: 'Insira a data de inicio do evento' })
      return
    }
    if (!end) {
      res.status(422).json({ message: 'Insira a data do fim do evento!' })
      return
    }

    // pegar token do usuario
    const token = getToken(req)
    const user = await getUserByToken(token)

    // criar evento
    const event = new Event({
      title,
      start,
      end,
      description,
      user: {
        _id: user.id,
        name: user.name,
        image: user.image,
        phone: user.phone
      }
    })

    try {
      const newEvent = await event.save()
      res.status(201).json({ message: 'Evento criado com sucesso!', newEvent })
    } catch (err) {
      res.status(500).json({ message: err })
    }
  }

  ////////////// RECEBER TODOS OS EVENTOS
  static async getAllEvents(req, res) {
    const events = await Event.find({
      start: { $gte: moment(req.query.start).toDate() },
      end: { $lte: moment(req.query.end).toDate() }
    })
    res.send(events)
  }

  ////////////// RECEBER OS EVENTOS DOS USUÁRIOS
  static async getUserEvents(req, res) {
    // usuário do token
    const token = getToken(req)
    const user = await getUserByToken(token)
    const userId = user._id.toString()
    const events = await Event.find({ 'user._id': userId }).sort('start')

    res.status(200).json({ events })
  }

  ////////////// RECEBER EVENTO PELO ID
  static async getEventById(req, res) {
    const id = req.params.id

    // verificar se o ID é valido
    if (!ObjectId(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    // validar se o evento existe
    const event = await Event.findOne({ _id: id })
    if (!event) {
      res.status(404).json({ message: 'Evento não encontrado!' })
      return
    }

    res.status(200).json({ event })
  }

  ////////////// ATUALIZAR EVENTO
  static async updateEvent(req, res) {
    const id = req.params.id
    const { title, start, end, description } = req.body
    const updatedData = {}

    // verificar se o ID é valido
    if (!ObjectId(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    // validar se o evento existe
    const event = await Event.findOne({ _id: id })
    if (!event) {
      res.status(404).json({ message: 'Evento não encontrado!' })
      return
    }

    // verifica se a request vem do usuario que criou o evento
    const token = getToken(req)
    const user = await getUserByToken(token)
    const userId = user._id.toString()
    if (event.user._id !== userId) {
      res
        .status(422)
        .json({ message: 'Houve um problema ao processar sua solicitação.' })
      return
    }

    // validações
    if (!title) {
      res.status(422).json({ message: 'Insira um título do evento!' })
      return
    } else {
      updatedData.title = title
    }
    if (!start) {
      res.status(422).json({ message: 'Insira a data de inicio do evento' })
      return
    } else {
      updatedData.start = start
    }
    if (!end) {
      res.status(422).json({ message: 'Insira a data do fim do evento!' })
      return
    } else {
      updatedData.end = end
    }
    if (description) {
      updatedData.description = description
    }

    try {
      await Event.findByIdAndUpdate(id, updatedData)
      res.status(200).json({ message: 'Evento atualizado com sucesso!' })
      return
    } catch (error) {
      res.status(422).json({ message: err })
      return
    }
  }

  ////////////// REMOVER EVENTO
  static async removeEvent(req, res) {
    const id = req.params.id

    // verificar se o ID é valido
    if (!ObjectId(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    // validar se o evento existe
    const event = await Event.findOne({ _id: id })

    if (!event) {
      res.status(404).json({ message: 'Evento não encontrado!' })
      return
    }

    // verifica se a request vem do usuario que criou o evento
    const token = getToken(req)
    const user = await getUserByToken(token)
    const userId = user._id.toString()
    if (event.user._id !== userId) {
      res
        .status(422)
        .json({ message: 'Houve um problema ao processar sua solicitação.' })
      return
    }

    try {
      await Event.findByIdAndRemove(id)
      res.status(200).json({ message: 'Evento removido com sucesso!' })
      return
    } catch (err) {
      res.status(422).json({ message: err })
      return
    }
  }
}
