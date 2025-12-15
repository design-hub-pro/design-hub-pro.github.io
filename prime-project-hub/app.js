// Prime Project Hub - Navigation-based Single Page App

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTodoList();
    initFilters();
    initNotifications();
    initQuickActions();
    initProjectSwitcher();
});

// Page titles mapping
const pageTitles = {
    'overview': 'Overview',
    'todos': 'TODO List',
    'phases': 'Project Phases',
    'reports': 'Progress Reports',
    'deliverables': 'Deliverables',
    'settings': 'Settings'
};

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    const views = document.querySelectorAll('.view');
    const pageTitle = document.getElementById('page-title');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = item.dataset.view;

            // Update navigation active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Show/hide views
            views.forEach(view => {
                view.classList.remove('active');
                if (view.id === `view-${viewId}`) {
                    view.classList.add('active');
                }
            });

            // Update page title
            pageTitle.textContent = pageTitles[viewId] || 'Dashboard';
        });
    });
}

// Quick Actions & Clickable Cards
function initQuickActions() {
    // Overview cards that link to views
    const clickableCards = document.querySelectorAll('[data-goto]');
    clickableCards.forEach(card => {
        card.addEventListener('click', () => {
            const targetView = card.dataset.goto;
            const navItem = document.querySelector(`.nav-item[data-view="${targetView}"]`);
            if (navItem) {
                navItem.click();
            }
        });
    });
}

// TODO List functionality
function initTodoList() {
    const todoItems = document.querySelectorAll('.todo-item');

    todoItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const actionBtn = item.querySelector('.todo-action');

        if (checkbox) {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    item.classList.add('completed');
                    item.dataset.status = 'completed';
                    showToast('Task completed!', 'success');
                } else {
                    item.classList.remove('completed');
                    item.dataset.status = 'active';
                }
                updateTodoBadge();
            });
        }

        if (actionBtn) {
            actionBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showTaskMenu(actionBtn, item);
            });
        }
    });

    // Add task button
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', showAddTaskModal);
    }
}

// Filter functionality
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const todoList = document.getElementById('todo-list');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const items = todoList.querySelectorAll('.todo-item');

            items.forEach(item => {
                const status = item.dataset.status;
                if (filter === 'all') {
                    item.style.display = 'flex';
                } else if (filter === 'active' && status === 'active') {
                    item.style.display = 'flex';
                } else if (filter === 'completed' && status === 'completed') {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

function updateTodoBadge() {
    const activeItems = document.querySelectorAll('.todo-item[data-status="active"]').length;
    const badge = document.querySelector('.nav-item[data-view="todos"] .nav-badge');
    if (badge) {
        badge.textContent = activeItems;
    }
}

function showTaskMenu(btn, item) {
    // Remove existing menus
    const existingMenu = document.querySelector('.task-menu');
    if (existingMenu) existingMenu.remove();

    const menu = document.createElement('div');
    menu.className = 'task-menu';
    menu.innerHTML = `
        <button class="menu-item" data-action="edit">Edit</button>
        <button class="menu-item" data-action="priority">Change Priority</button>
        <button class="menu-item delete" data-action="delete">Delete</button>
    `;

    // Position and style
    menu.style.cssText = `
        position: absolute;
        right: 0;
        top: 100%;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        padding: 4px;
        z-index: 1000;
        min-width: 140px;
    `;

    const style = document.createElement('style');
    style.textContent = `
        .task-menu .menu-item {
            display: block;
            width: 100%;
            padding: 8px 12px;
            border: none;
            background: none;
            font-size: 13px;
            color: #374151;
            cursor: pointer;
            text-align: left;
            border-radius: 4px;
        }
        .task-menu .menu-item:hover { background: #F3F4F6; }
        .task-menu .menu-item.delete { color: #EF4444; }
        .task-menu .menu-item.delete:hover { background: #FEE2E2; }
    `;
    document.head.appendChild(style);

    btn.style.position = 'relative';
    btn.appendChild(menu);

    menu.querySelectorAll('.menu-item').forEach(menuItem => {
        menuItem.addEventListener('click', () => {
            handleTaskAction(menuItem.dataset.action, item);
            menu.remove();
        });
    });

    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 0);
}

function handleTaskAction(action, item) {
    switch(action) {
        case 'edit':
            const title = item.querySelector('.todo-title');
            const newTitle = prompt('Edit task:', title.textContent);
            if (newTitle) {
                title.textContent = newTitle;
                showToast('Task updated', 'success');
            }
            break;
        case 'priority':
            const priority = item.querySelector('.priority');
            if (priority) {
                const priorities = ['high', 'medium', 'low'];
                const current = priorities.find(p => priority.classList.contains(p)) || 'low';
                const next = priorities[(priorities.indexOf(current) + 1) % 3];
                priority.className = `priority ${next}`;
                priority.textContent = next === 'high' ? 'High Priority' : next === 'medium' ? 'Medium' : 'Low';
                item.classList.toggle('high-priority', next === 'high');
                showToast(`Priority: ${next}`, 'info');
            }
            break;
        case 'delete':
            if (confirm('Delete this task?')) {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    item.remove();
                    updateTodoBadge();
                    showToast('Task deleted', 'info');
                }, 200);
            }
            break;
    }
}

function showAddTaskModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>Add New Task</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Task Title</label>
                    <input type="text" id="taskTitle" placeholder="What needs to be done?">
                </div>
                <div class="form-group">
                    <label>Priority</label>
                    <select id="taskPriority">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Due Date</label>
                    <input type="date" id="taskDueDate">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-cancel">Cancel</button>
                <button class="btn-save">Add Task</button>
            </div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .modal {
            background: white;
            border-radius: 12px;
            width: 400px;
            max-width: 90%;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid #E5E7EB;
        }
        .modal-header h3 { font-size: 16px; font-weight: 600; }
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #9CA3AF;
        }
        .modal-body { padding: 20px; }
        .form-group { margin-bottom: 16px; }
        .form-group label {
            display: block;
            font-size: 13px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 6px;
        }
        .form-group input, .form-group select {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            font-size: 14px;
        }
        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #E91E63;
        }
        .modal-footer {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            padding: 16px 20px;
            border-top: 1px solid #E5E7EB;
        }
        .btn-cancel, .btn-save {
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
        }
        .btn-cancel {
            background: white;
            border: 1px solid #E5E7EB;
            color: #6B7280;
        }
        .btn-save {
            background: #E91E63;
            border: none;
            color: white;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(modal);

    modal.querySelector('#taskTitle').focus();

    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.btn-cancel').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

    modal.querySelector('.btn-save').addEventListener('click', () => {
        const title = modal.querySelector('#taskTitle').value;
        const priority = modal.querySelector('#taskPriority').value;
        const dueDate = modal.querySelector('#taskDueDate').value;

        if (title) {
            addNewTask(title, priority, dueDate);
            modal.remove();
            showToast('Task added!', 'success');
        }
    });
}

function addNewTask(title, priority, dueDate) {
    const todoList = document.getElementById('todo-list');
    const newItem = document.createElement('div');
    newItem.className = `todo-item ${priority === 'high' ? 'high-priority' : ''}`;
    newItem.dataset.status = 'active';

    const formattedDate = dueDate
        ? new Date(dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : 'No date';

    newItem.innerHTML = `
        <label class="checkbox">
            <input type="checkbox">
            <span class="checkmark"></span>
        </label>
        <div class="todo-content">
            <span class="todo-title">${title}</span>
            <div class="todo-meta">
                <span class="priority ${priority}">${priority === 'high' ? 'High Priority' : priority === 'medium' ? 'Medium' : 'Low'}</span>
                <span class="due-date">Due: ${formattedDate}</span>
            </div>
        </div>
        <button class="todo-action">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="1"/>
                <circle cx="19" cy="12" r="1"/>
                <circle cx="5" cy="12" r="1"/>
            </svg>
        </button>
    `;

    // Insert at top
    const firstItem = todoList.querySelector('.todo-item');
    if (firstItem) {
        todoList.insertBefore(newItem, firstItem);
    } else {
        todoList.appendChild(newItem);
    }

    // Re-init handlers
    const checkbox = newItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            newItem.classList.add('completed');
            newItem.dataset.status = 'completed';
            showToast('Task completed!', 'success');
        } else {
            newItem.classList.remove('completed');
            newItem.dataset.status = 'active';
        }
        updateTodoBadge();
    });

    const actionBtn = newItem.querySelector('.todo-action');
    actionBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showTaskMenu(actionBtn, newItem);
    });

    updateTodoBadge();
}

// Notifications
function initNotifications() {
    const notificationBtn = document.getElementById('notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', showNotificationsPanel);
    }

    // Phase submit buttons
    document.querySelectorAll('.btn-submit-phase').forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('Phase submission started...', 'info');
        });
    });

    // Report buttons
    const newReportBtn = document.getElementById('new-report-btn');
    if (newReportBtn) {
        newReportBtn.addEventListener('click', () => {
            showToast('New report form would open here', 'info');
        });
    }

    // View/Upload buttons
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', () => showToast('Opening document...', 'info'));
    });

    document.querySelectorAll('.btn-upload').forEach(btn => {
        btn.addEventListener('click', () => showToast('Upload dialog would open here', 'info'));
    });
}

function showNotificationsPanel() {
    const existing = document.querySelector('.notifications-panel');
    if (existing) {
        existing.remove();
        return;
    }

    const panel = document.createElement('div');
    panel.className = 'notifications-panel';
    panel.innerHTML = `
        <div class="notif-header">
            <h4>Notifications</h4>
            <button class="mark-read">Mark all read</button>
        </div>
        <div class="notif-list">
            <div class="notif-item unread">
                <div class="notif-dot"></div>
                <div class="notif-content">
                    <span class="notif-title">UI Mockups due tomorrow</span>
                    <span class="notif-time">1 hour ago</span>
                </div>
            </div>
            <div class="notif-item unread">
                <div class="notif-dot"></div>
                <div class="notif-content">
                    <span class="notif-title">Progress Report #3 approved</span>
                    <span class="notif-time">2 days ago</span>
                </div>
            </div>
            <div class="notif-item">
                <div class="notif-dot"></div>
                <div class="notif-content">
                    <span class="notif-title">Research phase completed</span>
                    <span class="notif-time">1 week ago</span>
                </div>
            </div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .notifications-panel {
            position: absolute;
            top: 60px;
            right: 24px;
            width: 320px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            z-index: 1000;
            overflow: hidden;
        }
        .notif-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            border-bottom: 1px solid #E5E7EB;
        }
        .notif-header h4 { font-size: 14px; font-weight: 600; }
        .mark-read {
            background: none;
            border: none;
            color: #E91E63;
            font-size: 12px;
            cursor: pointer;
        }
        .notif-list { max-height: 300px; overflow-y: auto; }
        .notif-item {
            display: flex;
            gap: 12px;
            padding: 12px 16px;
            border-bottom: 1px solid #F3F4F6;
            cursor: pointer;
        }
        .notif-item:hover { background: #F9FAFB; }
        .notif-item.unread { background: #FEF3C7; }
        .notif-item.unread:hover { background: #FDE68A; }
        .notif-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #E5E7EB;
            margin-top: 6px;
            flex-shrink: 0;
        }
        .notif-item.unread .notif-dot { background: #E91E63; }
        .notif-content { flex: 1; }
        .notif-title { display: block; font-size: 13px; color: #374151; }
        .notif-time { font-size: 11px; color: #9CA3AF; }
    `;
    document.head.appendChild(style);
    document.body.appendChild(panel);

    panel.querySelector('.mark-read').addEventListener('click', () => {
        panel.querySelectorAll('.notif-item.unread').forEach(item => {
            item.classList.remove('unread');
        });
        document.querySelector('.notification-badge').style.display = 'none';
    });

    setTimeout(() => {
        document.addEventListener('click', function closePanel(e) {
            if (!panel.contains(e.target) && !e.target.closest('#notification-btn')) {
                panel.remove();
                document.removeEventListener('click', closePanel);
            }
        });
    }, 0);
}

// Toast notifications
function showToast(message, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                bottom: 24px;
                right: 24px;
                padding: 12px 20px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1001;
                animation: toastIn 0.3s ease;
            }
            .toast-success { background: #D1FAE5; color: #059669; }
            .toast-info { background: #DBEAFE; color: #2563EB; }
            .toast-error { background: #FEE2E2; color: #DC2626; }
            @keyframes toastIn {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Project Switcher
function initProjectSwitcher() {
    const projectSelector = document.getElementById('project-selector');
    const projectSelectorBtn = document.getElementById('project-selector-btn');
    const projectDropdown = document.getElementById('project-dropdown');
    const currentProjectName = document.getElementById('current-project-name');
    const projectOptions = document.querySelectorAll('.project-option');

    if (!projectSelector || !projectSelectorBtn) return;

    // Check if single project - if so, disable dropdown functionality
    if (projectOptions.length <= 1) {
        projectSelector.classList.add('single-project');
        return;
    }

    // Toggle dropdown
    projectSelectorBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        projectSelector.classList.toggle('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!projectSelector.contains(e.target)) {
            projectSelector.classList.remove('open');
        }
    });

    // Handle project selection
    projectOptions.forEach(option => {
        option.addEventListener('click', () => {
            const projectName = option.querySelector('.project-option-name').textContent;
            const projectId = option.dataset.project;

            // Update active state
            projectOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            // Update current project name in header
            currentProjectName.textContent = projectName;

            // Close dropdown
            projectSelector.classList.remove('open');

            // Show toast notification
            showToast(`Switched to: ${projectName}`, 'success');

            // In a real app, this would load the project data
            // For demo purposes, we just show the toast
            console.log(`Switched to project ID: ${projectId}`);
        });
    });
}
