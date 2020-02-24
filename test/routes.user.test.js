const request = require('supertest')
const app = require('../src/server')

let user = {
  name:'Victor Ruiz',
  email:'victor.ruiz@axity.com',
  password:'ejemplo'
}

const project = {
  name: 'Separación RMS Colombia'
}

const task = {
  description:'Esta es la descripcion de la tarea.',
  priority:3
}

describe('Test Routes', () => {

  beforeAll(async () => {
    await app.connectDb()
  });

  it('should create an user', async (done)=>{
    const res = await request(app)
                      .post('/user')
                      .send(`name=${user.name}`)
                      .send(`email=${user.email}`)
                      .send(`password=${user.password}`)
                      .set('Accept', 'application/json')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    user.id = res.body.user._id
    done()
  })

  it('should get the users', async  (done) => {
    const res = await request(app).get('/user')
    expect(res.status).toBe(200)
    done();
  })

  it('should delete an user', async (done)=>{
    const res = await request(app)
                      .delete(`/user/${user.id}`)
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.user.state).toBe(false)
    done()
  })

  it('should update an user', async (done)=>{
    const res = await request(app)
                      .put(`/user/${user.id}`)
                      .send(`name=${user.name} - test`)
                      .send(`state=true`)
                      .set('Accept', 'application/json')
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
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    project.id = res.body.project._id
    done()
  })

  it('should delete a project', async(done) =>{
    const res = await request(app)
                      .delete(`/project/${project.id}`)

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
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.project.state).toBe(true)
    done()
  })

  it('should get projects', async  (done) => {
    const res = await request(app).get('/project')
    expect(res.status).toBe(200)
    done();
  })

  it('should create a task', async (done)=>{
    const res = await request(app)
                      .post('/task')
                      .send(`description=${task.description}`)
                      .send(`priority=${task.priority}`)
                      .send(`user=${user.id}`)
                      .send(`project=${project.id}`)
                      .set('Accept', 'application/json')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    task.id = res.body.task._id
    done()
  })

  it('should delete a task', async(done) =>{
    const res = await request(app)
                      .delete(`/task/${task.id}`)

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
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body.task.state).toBe(true)
    done()
  })

  it('should get tasks', async  (done) => {
    const res = await request(app).get('/task')
    expect(res.status).toBe(200)
    done();
  })

  it('Test login', async (done)=>{
    const res = await request(app)
                      .post('/login')
                      .send(`email=${user.email}`)
                      .send(`password=${user.password}`)
                      .set('Accept', 'application/json')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    done()
  })
})
