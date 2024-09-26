const users = []; // 회원 정보를 저장할 배열
let isUsernameTaken = false; // 아이디 중복 체크 변수

function checkDuplicate() {
    const username = document.getElementById('username').value;

    // 입력한 아이디가 배열에 존재하는지 확인
    isUsernameTaken = users.some(user => user.username === username);

    if (isUsernameTaken) {
        document.getElementById('duplicate-check-msg').innerText = "이미 사용 중인 아이디입니다.";
    } else {
        document.getElementById('duplicate-check-msg').innerText = "사용 가능한 아이디입니다.";
    }
}

function checkPasswordValidity(password) {
    // 비밀번호는 최소 6자 이상, 숫자와 문자를 포함해야 함
    const hasNumber = /\d/; // 숫자가 있는지 체크
    const hasLetter = /[a-zA-Z]/; // 문자가 있는지 체크
    return password.length >= 6 && hasNumber.test(password) && hasLetter.test(password);
}

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (isUsernameTaken) {
        document.getElementById('registration-msg').innerText = "아이디가 중복되었습니다.";
        return;
    }

    if (!checkPasswordValidity(password)) {
        document.getElementById('registration-msg').innerText = "비밀번호는 최소 6자 이상, 숫자와 문자를 포함해야 합니다.";
        return;
    }

    // 회원 정보 저장
    users.push({ username: username, password: password });
    document.getElementById('registration-msg').innerText = "회원가입이 완료되었습니다!";
    
    // 배열 내용 출력
    console.log(users); // 배열의 내용을 콘솔에 출력합니다.

    // 입력 필드 초기화
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}
