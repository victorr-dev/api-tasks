const request = require('supertest')
const app = require('../src/server')

let user = {
  name:'Victor Ruiz',
  email:'victor.ruiz@axity.com',
  password:'ejemplo',
  token: ''
}

let newUser = {
  name:'Victor Ruiz',
  email:'vik_ases@live.com.mx',
  password:'ejemplo',
  token: ''
}

const project = {
  name: 'Separación RMS Colombia'
}

const task = {
  title: 'Tarea 01',
  description: 'Description tarea 1',
  status: 'ToDo',
  priority: 1
}

describe('Test Routes', () => {

  beforeAll(async () => {
    await app.connectDb()
  });

  it('Test login', async (done)=>{
    const res = await request(app)
                      .post('/login')
                      .send(`email=${user.email}`)
                      .send(`password=${user.password}`)
                      .set('Accept', 'application/json')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    user.token = res.body.token
    done()
  })
  
  it('should create an user', async (done)=>{
    const res = await request(app)
                      .post('/user')
                      .send(`name=${newUser.name}`)
                      .send(`email=${newUser.email}`)
                      .send(`password=${newUser.password}`)
                      .set('Accept', 'application/json')
                      .set('token', user.token)
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    newUser.id = res.body.user._id
    done()
  })

  it('should get the users', async  (done) => {
    const res = await request(app)
                      .get('/user')
                      .set('token', user.token)
    expect(res.status).toBe(200)
    done();
  })

  it('should delete an user', async (done)=>{
    const res = await request(app)
                      .delete(`/user/${newUser.id}`)
                      .set('token', user.token)
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.user.state).toBe(false)
    done()
  })

  it('should update an user', async (done)=>{
    const res = await request(app)
                      .put(`/user/${newUser.id}`)
                      .send(`name=${newUser.name} - test`)
                      .send(`state=true`)
                      .set('Accept', 'application/json')
                      .set('token', user.token)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.user.state).toBe(true)
    done()
  })

  it('should create a project', async(done) =>{
    const res = await request(app)
                      .post('/project')
                      .send(`name=${project.name}`)
                      .set('Accept', 'application/json')
                      .set('token', user.token)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    project.id = res.body.project._id
    done()
  })

  it('should delete a project', async(done) =>{
    const res = await request(app)
                      .delete(`/project/${project.id}`)
                      .set('token', user.token)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.project.state).toBe(false)
    done()
  })

  it('should update a project', async (done)=>{
    const res = await request(app)
                      .put(`/project/${project.id}`)
                      .send(`state=true`)
                      .set('Accept', 'application/json')
                      .set('token', user.token)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.project.state).toBe(true)
    done()
  })

  it('should get projects', async  (done) => {
    const res = await request(app)
                      .get('/project')
                      .set('token', user.token)

    expect(res.status).toBe(200)
    done();
  })

  it('should create a task', async (done)=>{
    const res = await request(app)
                      .post('/task')
                      .send(`title=${task.title}`)
                      .send(`description=${task.description}`)
                      .send(`priority=${task.priority}`)
                      .send(`user=${newUser.id}`)
                      .send(`project=${project.id}`)
                      .set('Accept', 'application/json')
                      .set('token', user.token)
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    task.id = res.body.task._id
    done()
  })

  it('should delete a task', async(done) =>{
    const res = await request(app)
                      .delete(`/task/${task.id}`)
                      .set('token', user.token)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.task.state).toBe(false)
    done()
  })

  it('should update a task', async (done)=>{
    const res = await request(app)
                      .put(`/task/${task.id}`)
                      .send(`state=true`)
                      .set('Accept', 'application/json')
                      .set('token', user.token)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.task.state).toBe(true)
    done()
  })

  it('should get tasks', async  (done) => {
    const res = await request(app)
                      .get('/task')
                      .set('token', user.token)

    expect(res.status).toBe(200)
    done();
  })

})
