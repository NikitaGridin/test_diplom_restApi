//Отправить запрос на соединени
    // const {senderId,receiverId} = req.body;
    // const connection = await Connection.create({
    //   senderId: senderId,
    //   receiverId: receiverId,
    //   status: 'pending'
    // });
    // res.status(200).send('Запрос отправлен');


    //получить список исходящих и входящих запросов у конкретного пользователя
    // const user = await User.findByPk(2, {
    //   attributes: ['id', 'login'],
    //   include: [
    //     {
    //       model: User,
    //       as: 'sender',
    //       through: {
    //         attributes: ['status'],
    //         where: { status: 'pending' }
    //       },
    //       attributes: ['id'],

    //     },
    //     {
    //       model: User,
    //       as: 'receiver',
    //       through: {
    //         attributes: ['status'],
    //         where: { status: 'pending' }
    //       },
    //       attributes: ['id', `login`],

    //     }
    //   ]
    // });
    // res.status(200).send(user);

    // Принять либо отклонить запрос
    // await Connection.update({ status: 'accepted' }, { where: { senderId: 1, receiverId: 2 } });

    //вывод всех соеденнёных пользователей с определённым пользователем
    // const connections = await Connection.findAll({
    //   attributes: ['id', 'status'],
    //   where: { status: 'accepted', [Op.or]: [{ senderId: 3 }, { receiverId: 3 }] },
    //   include: [
    // { model: User, as: 'receiver' }
    // ]
    // });
    // res.status(200).send(connections);