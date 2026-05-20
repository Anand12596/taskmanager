import React, { useEffect, useState } from 'react';

import api from '../services/api';

const Dashboard = () => {

    const [projects, setProjects] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [projectTitle, setProjectTitle] = useState('');

    const [projectDescription, setProjectDescription] = useState('');

    const [taskTitle, setTaskTitle] = useState('');

    const [taskDescription, setTaskDescription] = useState('');

    const [selectedProject, setSelectedProject] = useState('');

    const todoTasks = tasks.filter(
        (task) => task.status === 'TODO'
    );

    const inProgressTasks = tasks.filter(
        (task) => task.status === 'IN_PROGRESS'
    );

    const doneTasks = tasks.filter(
        (task) => task.status === 'DONE'
    );

    useEffect(() => {

        fetchProjects();

        fetchTasks();

    }, []);

    const fetchProjects = async () => {

        try {

            const response = await api.get('projects/');

            setProjects(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const fetchTasks = async () => {

        try {

            const response = await api.get('tasks/');

            setTasks(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const createProject = async (e) => {

        e.preventDefault();

        try {

            await api.post('projects/', {

                title: projectTitle,

                description: projectDescription,
            });

            setProjectTitle('');

            setProjectDescription('');

            fetchProjects();

            alert('Project Created');

        } catch (error) {

            alert('Project Create Failed');

        }
    };

    const createTask = async (e) => {

        e.preventDefault();

        try {

            await api.post('tasks/', {

                title: taskTitle,

                description: taskDescription,

                project: selectedProject,
            });

            setTaskTitle('');

            setTaskDescription('');

            setSelectedProject('');

            fetchTasks();

            alert('Task Created');

        } catch (error) {

            alert('Task Create Failed');

        }
    };

    const deleteProject = async (id) => {

        try {

            await api.delete(`projects/${id}/`);

            fetchProjects();

            alert('Project Deleted');

        } catch (error) {

            alert('Delete Failed');

        }
    };

    const deleteTask = async (id) => {

        try {

            await api.delete(`tasks/${id}/`);

            fetchTasks();

            alert('Task Deleted');

        } catch (error) {

            alert('Delete Failed');

        }
    };

    return (

        <div className="container mt-5">

            <h1 className="mb-4">
                Dashboard
            </h1>

            <div className="row mb-5">

                <div className="col-md-3">

                    <div className="card shadow p-4">

                        <h3>Total Tasks</h3>

                        <h1>{tasks.length}</h1>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow p-4">

                        <h3>Todo</h3>

                        <h1>{todoTasks.length}</h1>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow p-4">

                        <h3>In Progress</h3>

                        <h1>{inProgressTasks.length}</h1>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow p-4">

                        <h3>Done</h3>

                        <h1>{doneTasks.length}</h1>

                    </div>

                </div>

            </div>

            <div className="card shadow p-4 mb-5">

                <h2>Create Project</h2>

                <form onSubmit={createProject}>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Project Title"
                        value={projectTitle}
                        onChange={(e) =>
                            setProjectTitle(e.target.value)
                        }
                    />

                    <textarea
                        className="form-control mb-3"
                        placeholder="Description"
                        value={projectDescription}
                        onChange={(e) =>
                            setProjectDescription(e.target.value)
                        }
                    />

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Create
                    </button>

                </form>

            </div>

            <div className="card shadow p-4 mb-5">

                <h2>Create Task</h2>

                <form onSubmit={createTask}>

                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Task Title"
                        value={taskTitle}
                        onChange={(e) =>
                            setTaskTitle(e.target.value)
                        }
                    />

                    <textarea
                        className="form-control mb-3"
                        placeholder="Task Description"
                        value={taskDescription}
                        onChange={(e) =>
                            setTaskDescription(e.target.value)
                        }
                    />

                    <select
                        className="form-control mb-3"
                        value={selectedProject}
                        onChange={(e) =>
                            setSelectedProject(e.target.value)
                        }
                    >

                        <option value="">
                            Select Project
                        </option>

                        {projects.map((project) => (

                            <option
                                key={project.id}
                                value={project.id}
                            >
                                {project.title}
                            </option>

                        ))}

                    </select>

                    <button
                        type="submit"
                        className="btn btn-success"
                    >
                        Create Task
                    </button>

                </form>

            </div>

            <h2 className="mb-4">
                Projects
            </h2>

            <div className="row">

                {projects.map((project) => (

                    <div
                        className="col-md-4 mb-4"
                        key={project.id}
                    >

                        <div className="card shadow p-4">

                            <h3>{project.title}</h3>

                            <p>{project.description}</p>

                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    deleteProject(project.id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            <h2 className="mb-4 mt-5">
                Tasks
            </h2>

            <div className="row">

                {tasks.map((task) => (

                    <div
                        className="col-md-4 mb-4"
                        key={task.id}
                    >

                        <div className="card shadow p-4">

                            <h3>{task.title}</h3>

                            <p>{task.description}</p>

                            <p>
                                <strong>Status:</strong>{' '}
                                {task.status}
                            </p>

                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    deleteTask(task.id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Dashboard;