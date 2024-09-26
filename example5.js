document.getElementById('addButton').onclick = function() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        const taskList = document.getElementById('taskList');
        const newTask = document.createElement('li');
        newTask.textContent = taskValue;

        // 삭제 버튼 생성
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.className = 'rmButton';

        // 삭제 버튼 클릭 시 해당 아이템 삭제
        deleteButton.onclick = function() {
            taskList.removeChild(newTask);
        };

        newTask.appendChild(deleteButton); // 리스트 아이템에 삭제 버튼 추가
        taskList.appendChild(newTask); // 리스트에 새로운 아이템 추가
        taskInput.value = ''; // 입력 필드 비우기
    } else {
        alert('할 일을 입력하세요!'); // 경고 메시지
    }
};

// 전체 삭제 버튼 클릭 시 모든 항목 삭제
document.getElementById('rmButton').onclick = function() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // 리스트의 모든 내용 삭제
};
