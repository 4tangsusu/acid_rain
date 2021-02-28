const words = ['강아지', '고양이', '병아리', '송아지', '닭', '뱀', '쥐', '개미', '거미', '벌', '염소', '까치', '참새', '올빼미', '까마귀'];
let index = 1, min = 0, score = 0, maxHp = 5, hp = maxHp, speed = 2000;
if (localStorage.best == null) {
    localStorage.best = 0;
}
document.getElementById('best').innerHTML = localStorage.best;
function submit() {
    let node, value = document.getElementById('text').value, effect;
    for (let i = min; i < index; i++) {
        node = document.getElementById(i);
        effect = document.getElementById(i * -1)
        //만약 입력한 단어와 떨어지는 단어가 같다면 해당 노드를 비활성화하고 점수 갱신
        if (node != null && value == node.innerHTML) {
            node.style.display = 'none';
            node.id += null;
            score += value.length;
            document.getElementById('count').innerHTML = score;
            if (score > localStorage.best) {
                localStorage.best = score;
                document.getElementById('best').innerHTML = localStorage.best;
            }
            //이펙트 활성화
            effect.style.animationPlayState = 'paused';
            effect.style.transform = 'scale(3)';
            effect.style.opacity = 0;
            break;
        }
    }
    document.getElementById('text').value = '';
};
function remove(num, time) {
    setTimeout(() => {
        let clone = document.getElementById(num)
        if (clone == null) {
            clone = document.getElementById(num + 'null');
            let effect = document.getElementById(num * -1);
        } else {
            hp -= 1;
            document.getElementById('bar').style.width = `${250 * hp / maxHp}px`;
            //만약 체력이 0이라면 팝업창 띄우기
            if (hp == 0) {
                document.getElementById('popup').style.display = 'block';
            }
        }
        clone.parentNode.removeChild(clone);
        min = num + 1;
        //이펙트의 트렌지션 시간을 고려하여 0.5초 뒤에 이펙트 삭제
        let effect = document.getElementById(num * -1);
        setTimeout(() => effect.parentNode.removeChild(effect), 500);
    }, time);
}
document.getElementById('text').addEventListener('keydown', event => {
    if (event.key == 'Enter') {
        submit();
    }
})
function init() {
    if (confirm('정말로 최고기록을 초기화할까요?')) {
        localStorage.best = 0;
        location.reload();
    }
}
function multiple() {
    //떨어지는 글자 생성
    let clone = document.createElement('span');
    clone.className = 'clone';
    clone.id = index;
    //무작위로 속성 설정
    clone.innerHTML = words[Math.round(Math.random() * (words.length - 1))];
    clone.style.left = `${Math.random() * (90 - 5) + 5}%`;
    clone.style.transform = 'translateX(-50%)';
    clone.style.animationDuration = `${Math.random() * (5 - 2) + 2}s`
    document.getElementById('screen').appendChild(clone);
    //이펙트 생성
    let effect = document.createElement('span');
    effect.id = index * -1;
    effect.className = 'effect';
    effect.style.left = window.getComputedStyle(clone).left;
    effect.style.transform = 'translateX(-50%)';
    effect.style.transform = 'scale(0)';
    effect.style.animationDuration = window.getComputedStyle(clone).animationDuration;
    document.getElementById('screen').appendChild(effect);
    //에니메이션 실행 뒤 노드 삭제
    remove(index, window.getComputedStyle(clone).animationDuration.replace('s', '') * 1000);
    index++;
}
function wait(time) {
    return new Promise(
        (resolve, reject) => setTimeout(resolve, time)
    );
}
async function start() {
    for (; speed > 800; speed -= 20) {
        multiple();
        await wait(speed);
    }
    setInterval(multiple, speed);
}
//1초 뒤에 게임 실행
setTimeout(start, 1000);