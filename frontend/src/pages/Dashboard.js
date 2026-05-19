import { useEffect, useState } from 'react';
import API from '../services/api';

function Dashboard() {

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedProject, setSelectedProject] = useState('');

    const [priority, setPriority] = useState('MEDIUM');

    const [dueDate, setDueDate] = useState('');

    const [editingId, setEditingId] = useState(null);

    const [editingTaskId, setEditingTaskId] = useState(null);

    const [search, setSearch] = useState('');

    const logout = () => {

        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        window.location.href = '/';
    };

    const fetchProjects = async () => {

        try {

            const response = await API.get('projects/');

            setProjects(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const fetchTasks = async () => {

        try {

            const response = await API.get('tasks/');

            setTasks(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const createProject = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await API.put(`projects/${editingId}/`, {
                    title,
                    description,
                });

                alert('Project Updated');

                setEditingId(null);

            } else {

                await API.post('projects/', {
                    title,
                    description,
                });

                alert('Project Created');
            }

            fetchProjects();

            setTitle('');
            setDescription('');

        } catch (error) {

            alert('Project Failed');
        }
    };

    const deleteProject = async (id) => {

        try {

            await API.delete(`projects/${id}/`);

            alert('Project Deleted');

            fetchProjects();

        } catch (error) {

            alert('Delete Failed');
        }
    };

    const editProject = (project) => {

        setEditingId(project.id);

        setTitle(project.title);

        setDescription(project.description);
    };

    const createTask = async (e) => {

        e.preventDefault();

        try {

            if (editingTaskId) {

                await API.put(`tasks/${editingTaskId}/`, {
                    title: taskTitle,
                    description: taskDescription,
                    status: 'TODO',
                    priority: priority,
                    due_date: dueDate,
                    project: selectedProject,
                });

                alert('Task Updated');

                setEditingTaskId(null);

            } else {

                await API.post('tasks/', {
                    title: taskTitle,
                    description: taskDescription,
                    status: 'TODO',
                    priority: priority,
                    due_date: dueDate,
                    project: selectedProject,
                });

                alert('Task Created');
            }

            fetchTasks();

            setTaskTitle('');
            setTaskDescription('');
            setSelectedProject('');
            setPriority('MEDIUM');
            setDueDate('');

        } catch (error) {

            alert('Task Failed');
        }
    };

    const deleteTask = async (id) => {

        try {

            await API.delete(`tasks/${id}/`);

            alert('Task Deleted');

            fetchTasks();

        } catch (error) {

            alert('Delete Failed');
        }
    };

    const editTask = (task) => {

        setEditingTaskId(task.id);

        setTaskTitle(task.title);

        setTaskDescription(task.description);

        setSelectedProject(task.project);

        setPriority(task.priority);

        setDueDate(task.due_date);
    };

    const updateTaskStatus = async (id, status) => {

        try {

            await API.patch(`tasks/${id}/`, {
                status: status,
            });

            alert('Status Updated');

            fetchTasks();

        } catch (error) {

            alert('Status Update Failed');
        }
    };

    useEffect(() => {

        fetchProjects();
        fetchTasks();

    }, []);

    return (

        <div>

            <nav className="navbar navbar-dark bg-dark px-4">

                <h3 className="text-white">
                    Task Manager
                </h3>

                <button
                    className="btn btn-danger"
                    onClick={logout}
                >
                    Logout
                </button>

            </nav>

            <div className="container mt-5">

                <h2 className="mb-4">
                    Dashboard
                </h2>

                <div className="row mb-5">

                    <div className="col-md-3">

                        <div className="card shadow p-4">

                            <h5>Total Tasks</h5>

                            <h1>{tasks.length}</h1>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow p-4">

                            <h5>Completed</h5>

                            <h1>
                                {
                                    tasks.filter(
                                        task => task.status === 'DONE'
                                    ).length
                                }
                            </h1>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow p-4">

                            <h5>In Progress</h5>

                            <h1>
                                {
                                    tasks.filter(
                                        task =>
                                        task.status === 'IN_PROGRESS'
                                    ).length
                                }
                            </h1>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow p-4">

                            <h5>Pending</h5>

                            <h1>
                                {
                                    tasks.filter(
                                        task => task.status === 'TODO'
                                    ).length
                                }
                            </h1>

                        </div>

                    </div>

                </div>

                <div className="card p-4 shadow mb-5">

                    <h3>
                        {editingId ? 'Edit Project' : 'Create Project'}
                    </h3>

                    <form onSubmit={createProject}>

                        <input
                            type="text"
                            placeholder="Project Title"
                            className="form-control mb-3"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                        />

                        <textarea
                            placeholder="Description"
                            className="form-control mb-3"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                        />

                        <button
                            className="btn btn-primary"
                        >
                            {editingId ? 'Update' : 'Create'}
                        </button>

                    </form>

                </div>

                <div className="card p-4 shadow mb-5">

                    <h3>
                        {editingTaskId ? 'Edit Task' : 'Create Task'}
                    </h3>

                    <form onSubmit={createTask}>

                        <input
                            type="text"
                            placeholder="Task Title"
                            className="form-control mb-3"
                            value={taskTitle}
                            onChange={(e) =>
                                setTaskTitle(e.target.value)
                            }
                        />

                        <textarea
                            placeholder="Task Description"
                            className="form-control mb-3"
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

                        <input
                            type="date"
                            className="form-control mb-3"
                            value={dueDate}
                            onChange={(e) =>
                                setDueDate(e.target.value)
                            }
                        />

                        <select
                            className="form-control mb-3"
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value)
                            }
                        >

                            <option value="LOW">
                                LOW
                            </option>

                            <option value="MEDIUM">
                                MEDIUM
                            </option>

                            <option value="HIGH">
                                HIGH
                            </option>

                        </select>

                        <button
                            className="btn btn-success"
                        >
                            {editingTaskId ? 'Update Task' : 'Create Task'}
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

                                <h4>
                                    {project.title}
                                </h4>

                                <p>
                                    {project.description}
                                </p>

                                <button
                                    className="btn btn-warning mb-2"
                                    onClick={() =>
                                        editProject(project)
                                    }
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

                <h2 className="mt-5 mb-4">
                    Tasks
                </h2>

                <input
                    type="text"
                    placeholder="Search Tasks..."
                    className="form-control mb-4"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <div className="row">

                    {tasks
                    .filter((task) =>
                        task.title
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    )
                    .map((task) => (

                        <div
                            className="col-md-4 mb-4"
                            key={task.id}
                        >

                            <div
                                className={
                                    new Date(task.due_date) < new Date()
                                    && task.status !== 'DONE'
                                    ? 'card shadow p-4 border border-danger border-3'
                                    : 'card shadow p-4'
                                }
                            >

                                <h4>
                                    {task.title}
                                </h4>

                                <p>
                                    {task.description}
                                </p>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Status
                                    </label>

                                    <select
                                        className={
                                            task.status === 'DONE'
                                            ? 'form-control bg-success text-white'
                                            : task.status === 'IN_PROGRESS'
                                            ? 'form-control bg-primary text-white'
                                            : 'form-control bg-warning'
                                        }
                                        value={task.status}
                                        onChange={(e) =>
                                            updateTaskStatus(
                                                task.id,
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="TODO">
                                            TODO
                                        </option>

                                        <option value="IN_PROGRESS">
                                            IN PROGRESS
                                        </option>

                                        <option value="DONE">
                                            DONE
                                        </option>

                                    </select>

                                </div>

                                <div className="mb-3">

                                    <strong>Priority:</strong>

                                    <span
                                        className={
                                            task.priority === 'HIGH'
                                            ? 'badge bg-danger ms-2'
                                            : task.priority === 'MEDIUM'
                                            ? 'badge bg-warning text-dark ms-2'
                                            : 'badge bg-success ms-2'
                                        }
                                    >
                                        {task.priority}
                                    </span>

                                </div>

                                <p>

                                    <strong>Due Date:</strong> {task.due_date}

                                </p>

                                {
                                    new Date(task.due_date) < new Date()
                                    && task.status !== 'DONE'
                                    && (

                                        <div className="alert alert-danger p-2">

                                            Overdue Task

                                        </div>

                                    )
                                }

                                <p>
                                    <strong>Project ID:</strong> {task.project}
                                </p>

                                <button
                                    className="btn btn-warning mb-2"
                                    onClick={() =>
                                        editTask(task)
                                    }
                                >
                                    Edit Task
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        deleteTask(task.id)
                                    }
                                >
                                    Delete Task
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;