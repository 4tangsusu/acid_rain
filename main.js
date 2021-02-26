let words = ['강아지', '고양이', '병아리', '송아지', '닭', '뱀'], index = 1, min = 0, score = 0, hp = 3;
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
function wait(num, time) {
    setTimeout(() => {
        let clone = document.getElementById(num)
        let effect = document.getElementById(num * -1);
        if (clone == null) {
            clone = document.getElementById(num + 'null');
        } else {
            hp -= 1;
            document.getElementById('bar').style.width = `${80 * hp}px`;
            if (hp == 0) {
                document.getElementById('popup').style.display = 'block';
            }
        }
        clone.parentNode.removeChild(clone);
        effect.parentNode.removeChild(effect);
        min = num + 1;
    }, time);
}
document.getElementById('text').addEventListener('keydown', event => {
    if (event.key == 'Enter') {
        submit();
    }
})
function multiple() {
    //떨어지는 글자 생성
    let clone = document.createElement('span');
    clone.className = 'clone';
    clone.id = index;
    //무작위로 단어 선택
    clone.innerHTML = words[Math.round(Math.random() * (words.length - 1))];
    //무작위 x좌표로 이동
    clone.style.left = `${Math.random() * (90 - 5) + 5}%`;
    clone.style.animationDuration = `${Math.random() * (5 - 2) + 2}s`
    document.getElementById('screen').appendChild(clone);
    //이펙트 생성
    let effect = document.createElement('span');
    effect.id = index * -1;
    effect.className = 'effect';
    effect.style.left = window.getComputedStyle(clone).left;
    effect.style.animationDuration = window.getComputedStyle(clone).animationDuration;
    document.getElementById('screen').appendChild(effect);
    wait(index, window.getComputedStyle(clone).animationDuration.replace('s', '') * 1000);
    index++;
}
multiple();
setInterval(multiple, 1300);
function init() {
    if (confirm('정말로 최고기록을 초기화할까요?')) {
        localStorage.best = 0;
        location.reload();
    }
}