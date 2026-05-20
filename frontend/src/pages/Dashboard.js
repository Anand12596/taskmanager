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

    const fetchProjects = async () => {

        try {

            const response = await api.get(
                'projects/'
            );

            setProjects(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const fetchTasks = async () => {

        try {

            const response = await api.get(
                'tasks/'
            );

            setTasks(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchProjects();

        fetchTasks();

    }, []);

    const createProject = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                'projects/',
                {
                    title: projectTitle,
                    description: projectDescription,
                }
            );

            alert('Project Created');

            setProjectTitle('');

            setProjectDescription('');

            fetchProjects();

        } catch (error) {

            console.log(error);

            alert('Project Create Failed');
        }
    };

    const createTask = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                'tasks/',
                {
                    title: taskTitle,
                    description: taskDescription,
                    project: selectedProject,
                }
            );

            alert('Task Created');

            setTaskTitle('');

            setTaskDescription('');

            setSelectedProject('');

            fetchTasks();

        } catch (error) {

            console.log(error);

            alert('Task Create Failed');
        }
    };

    const deleteProject = async (id) => {

        try {

            await api.delete(
                `projects/${id}/`
            );

            alert('Project Deleted');

            fetchProjects();

        } catch (error) {

            console.log(error);

            alert('Delete Failed');
        }
    };

    const deleteTask = async (id) => {

        try {

            await api.delete(
                `tasks/${id}/`
            );

            alert('Task Deleted');

            fetchTasks();

        } catch (error) {

            console.log(error);

            alert('Delete Failed');
        }
    };

    const totalTasks = tasks.length;

    const todoTasks = tasks.filter(
        (task) => task.status === 'TODO'
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === 'IN_PROGRESS'
    ).length;

    const doneTasks = tasks.filter(
        (task) => task.status === 'DONE'
    ).length;

    return (

        <div className="container mt-5">

            <h1 className="mb-5">
                Dashboard
            </h1>

            <div className="row mb-5">

                <div className="col-md-3">

                    <div className="card p-4 shadow">

                        <h3>Total Tasks</h3>

                        <h1>{totalTasks}</h1>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card p-4 shadow">

                        <h3>Todo</h3>

                        <h1>{todoTasks}</h1>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card p-4 shadow">

                        <h3>In Progress</h3>

                        <h1>{inProgressTasks}</h1>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card p-4 shadow">

                        <h3>Done</h3>

                        <h1>{doneTasks}</h1>

                    </div>

                </div>

            </div>

            <div className="card p-4 shadow mb-5">

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

            <div className="card p-4 shadow mb-5">

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

            <h1 className="mb-4">
                Projects
            </h1>

            <div className="row">

                {projects.map((project) => (

                    <div
                        className="col-md-4 mb-4"
                        key={project.id}
                    >

                        <div className="card p-4 shadow">

                            <h2>{project.title}</h2>

                            <p>{project.description}</p>

                            <h4>
                                Team Members:
                                {' '}
                                {project.members?.length || 0}
                            </h4>

                            <button
                                className="btn btn-secondary mb-3"
                                onClick={async () => {

                                    const memberId = prompt(
                                        'Enter User ID'
                                    );

                                    try {

                                        await api.patch(
                                            `projects/${project.id}/`,
                                            {
                                                member_ids: [
                                                    Number(memberId)
                                                ]
                                            }
                                        );

                                        alert(
                                            'Member Added'
                                        );

                                        fetchProjects();

                                    } catch (error) {

                                        console.log(error);

                                        alert('Add Failed');
                                    }
                                }}
                            >
                                Add Member
                            </button>

                            <button
                                className="btn btn-warning mb-3"
                                onClick={async () => {

                                    const newTitle = prompt(
                                        'Enter New Project Title',
                                        project.title
                                    );

                                    try {

                                        await api.patch(
                                            `projects/${project.id}/`,
                                            {
                                                title: newTitle
                                            }
                                        );

                                        alert(
                                            'Project Updated'
                                        );

                                        fetchProjects();

                                    } catch (error) {

                                        console.log(error);

                                        alert(
                                            JSON.stringify(
                                                error.response.data
                                            )
                                        );
                                    }
                                }}
                            >
                                Edit
                            </button>

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

            <h1 className="mb-4 mt-5">
                Tasks
            </h1>

            <div className="row">

                {tasks.map((task) => (

                    <div
                        className="col-md-4 mb-4"
                        key={task.id || task._id}
                    >

                        <div className="card p-4 shadow">

                            <h2>{task.title}</h2>

                            <p>{task.description}</p>

                            <h4>
                                Status:
                                {' '}
                                {task.status}
                            </h4>

                            <select
                                className="form-control mb-3"
                                value={task.status}
                                onChange={async (e) => {

                                    try {

                                        await api.patch(
                                            `tasks/${task.id || task._id}/`,
                                            {
                                                status:
                                                    e.target.value
                                            }
                                        );

                                        fetchTasks();

                                    } catch (error) {

                                        console.log(error);

                                        alert(
                                            JSON.stringify(
                                                error.response.data
                                            )
                                        );
                                    }
                                }}
                            >

                                <option value="TODO">
                                    Todo
                                </option>

                                <option value="IN_PROGRESS">
                                    In Progress
                                </option>

                                <option value="DONE">
                                    Done
                                </option>

                            </select>

                            <button
                                className="btn btn-warning mb-3"
                                onClick={async () => {

                                    const newTitle = prompt(
                                        'Enter New Task Title',
                                        task.title
                                    );

                                    try {

                                        await api.patch(
                                            `tasks/${task.id || task._id}/`,
                                            {
                                                title: newTitle
                                            }
                                        );

                                        alert(
                                            'Task Updated'
                                        );

                                        fetchTasks();

                                    } catch (error) {

                                        console.log(error);

                                        alert(
                                            JSON.stringify(
                                                error.response.data
                                            )
                                        );
                                    }
                                }}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    deleteTask(
                                        task.id || task._id
                                    )
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