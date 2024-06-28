// 접속자 수를 저장할 변수
let visitorCount = 5;

// DOM 요소 가져오기
const visitorCountElement = document.getElementById('visitorCount');

// 페이지가 로드될 때 실행될 함수
function updateVisitorCount() {
    // 접속자 수 1 증가
    visitorCount++;
    // 화면에 표시
    visitorCountElement.textContent = visitorCount;
}


let queuePosition = 0; // 초기 대기열 위치 설정
const spacing = 10; // 각 점 사이의 간격
let dotCount = 0; // 현재 점의 개수
const timePerDot = 1; //인당 대기 시간 (분)

function checkCongestion() {
    dots = dotCount;
    const congestionStatus = document.getElementById('congestionStatus');

    if (dots >= 50) {
        congestionStatus.textContent = '혼잡도: 혼잡';
        congestionStatus.style.color = 'red'; // 혼잡일 때 글씨 색상
    } else if (dots >= 30) {
        congestionStatus.textContent = '혼잡도: 보통';
        congestionStatus.style.color = 'orange';
    } else {
        congestionStatus.textContent = '혼잡도: 여유';
        congestionStatus.style.color = 'green';
    }
}
/* 대기 시간 */
function updateWaitingTime(){
    let dots = dotCount;
    const waitingTime = document.getElementById('waitingTime');
    
    const waitingtime = dots * timePerDot;
    
    waitingTime.textContent = '대기 시간: ' +waitingtime+'분';
}
function createDot() {

    const dot = document.createElement('div');
    dot.classList.add('dot');

    
// 줄을 따라 점을 배치 
    const variability = 20; //범위 설정 
    const randomOffset = Math.random() * variability - variability / 2; // Random offset 설정 

    let x,y;
    if(dotCount < 50){
        x = 715 + randomOffset; // x 좌표를 결정 (일정 범위 내에서 랜덤하게)
    
        y = 120 + dotCount * spacing;  // y 좌표를 계산 
    }
    //줄의 위치에 맞게 점이 찍히도록 설정 
    else if(dotCount <72){ 
        x = 625 + (dotCount-40) * spacing;
        y = 620 + randomOffset;
    }
    else if(dotCount < 82){
        x = 930 + randomOffset;
        y = 620 + (dotCount - 72) * spacing;
    }
    else if (dotCount < 125){
        x = 930 + (dotCount - 82) * (-spacing);
        y = 720 + randomOffset;
    }

    dot.style.left = x + 'px';
    dot.style.top = y + 'px';

    // body 요소에 점을 추가
    document.body.appendChild(dot);

    // 대기열 위치 증가
    queuePosition++;
    dotCount++;
    // 혼잡도를 계속해서 변경 
    checkCongestion();
    updateWaitingTime();
    

}
function origincreateDot(startX, startY,direction) {

    // 새로운 div 요소를 생성하여 점으로 사용할 클래스를 추가
    const dot = document.createElement('div');
    dot.classList.add('origindot');


// 화면 상의 경로(가로선)을 따라 점을 배치
    const variability = 20; 
    const randomOffset = Math.random() * variability - variability / 2; 
    let x,y;
    if (direction ==0){
        x = startX + queuePosition * spacing*(-1);
        y = startY + randomOffset;
    }
    else if (direction ==1){
        x = startX + randomOffset;
        y = startY + queuePosition * spacing; 
    }
    else if (direction ==2){
        x = startX + queuePosition * spacing;
        y = startY + randomOffset;
    }
    dot.style.left = x + 'px';
    dot.style.top = y + 'px';

    // body 요소에 점을 추가
    document.body.appendChild(dot);

    // 대기열 위치 증가
    queuePosition++;
    dotCount++;

}

// 페이지 로드 시 초기 점 생성( 실제 줄의 길이 표시 )
function initializeQueue(initialCount) {
    for (let j = 0; j < 5; j++){
        origincreateDot(800, 200, 0);
        origincreateDot(800, 220, 0);
    }
    //줄의 모양에 맞게 점이 찍히도록 설정 
    if(initialCount <=40){
        for (let i = 0; i < initialCount; i++) {
        origincreateDot(715,120,1);
        }
    }
    else{
        for (let i = 0; i < 40; i++) {
        origincreateDot(715,120,1);
        }
        if(initialCount <= 62){
            for(let i = 40; i< initialCount; i++){
                origincreateDot(225, 620,2)
            }
        }
        else{
            for(let i = 40; i< 62; i++){
                origincreateDot(225, 620,2)
            }
            if (initialCount <= 72){
                for(let i = 62; i<initialCount;i++){
                    origincreateDot(920, -80, 1)
                }
            }
            else{
                for(let i = 62; i<72;i++){
                    origincreateDot(920, -80, 1)
                }
                for(let i = 72; i<initialCount; i++){
                    origincreateDot(1720, 720, 0)
                }
                
            }
        }
    }
    //혼잡도 업데이트용 
    checkCongestion();
    updateWaitingTime();
}

// 페이지 로드 시 실행
window.onload = function() {
    updateVisitorCount(); // 처음 로드될 때 접속자 수 업데이트
    initializeQueue(60);
    
};



