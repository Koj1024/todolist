let battery = 100; // 배터리 상태를 저장하는 변수
let alarms = []; // 알람을 저장하는 배열

function updateTime() {
    const now = new Date(); // 날짜와 시간을 다루기 위한 내장 객체 Date 객체 생성
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Seoul' };
    const formattedTime = now.toLocaleString('ko-KR', options).replace(/\./g, '-'); // 형식: yy-mm-dd hh:mm:ss
    document.getElementById('time').innerText = formattedTime; // html 파일에서 id가 time인 텍스트를 formattedTime으로 업데이트

    // 알람 확인
    checkAlarms(now);

    if (battery > 0) { // battery 변수가 0보다 크면?
        battery--; // battery 변수가 1씩 감소
        document.getElementById('battery-status').innerText = `배터리: ${battery}%`; // html 파일에서 id가 battery-status인 텍스트를 현재 배터리 상태로 업데이트
        if (battery == 0) { // battery 변수가 0일때 
            document.getElementById('current-time').classList.add('hidden'); // html 파일에서 id가 current-time인 요소에 .hidden클래스 추가
        }
    }
}

function checkAlarms(now) {
    alarms.forEach((alarm, index) => {
        if (now.getHours() === alarm.hour && now.getMinutes() === alarm.minute && now.getSeconds() === alarm.second) {
            alert(`알람: ${alarm.hour}:${alarm.minute}:${alarm.second}입니다!`);
            alarms.splice(index, 1); // 알람 리스트에서 제거
            updateAlarmList(); // 알람 목록 업데이트
        }
    });
}

function addAlarm() {
    const hour = parseInt(document.getElementById('alarm-hour').value);
    const minute = parseInt(document.getElementById('alarm-minute').value);
    const second = parseInt(document.getElementById('alarm-second').value);

    if (alarms.length < 3) { // 최대 3개 알람까지 추가 가능
        alarms.push({ hour, minute, second });
        updateAlarmList();
    } else {
        alert('최대 3개의 알람만 설정할 수 있습니다.');
    }

    // 입력 필드 초기화
    document.getElementById('alarm-hour').value = '';
    document.getElementById('alarm-minute').value = '';
    document.getElementById('alarm-second').value = '';
}

function updateAlarmList() {
    const alarmListDiv = document.getElementById('alarm-list');
    alarmListDiv.innerHTML = ''; // 기존 알람 목록 초기화
    alarms.forEach(alarm => {
        const alarmItem = document.createElement('div');
        alarmItem.innerText = `알람: ${alarm.hour}:${alarm.minute}:${alarm.second}`;
        alarmListDiv.appendChild(alarmItem);
    });
}

// 충전 버튼 클릭 시 배터리를 100으로 설정
document.getElementById('charge-battery').addEventListener('click', () => {
    battery = 100; // 배터리 상태를 100으로 설정
    document.getElementById('battery-status').innerText = `배터리: ${battery}%`; // 배터리 상태 업데이트
    document.getElementById('current-time').classList.remove('hidden'); // 검은 화면을 제거
});

// 1초마다 현재 시간 업데이트 및 배터리 감소
setInterval(updateTime, 1000);

// 알람 추가 버튼 클릭 시 addAlarm 함수 호출
document.getElementById('add-alarm').addEventListener('click', addAlarm);
