'use strict';

const colors = [
  ['#A4593C', '陶土橙', true], ['#D98A56', '杏橙'], ['#D9AF71', '麦芽金'], ['#E6CEAE', '燕麦'],
  ['#8B4C50', '豆沙红', true], ['#B97C7E', '干玫瑰'], ['#CB9A8C', '胭脂粉'], ['#DDD0C3', '浅灰褐'],
  ['#456D62', '松绿', true], ['#7A8C72', '鼠尾草'], ['#A4B4A2', '青瓷'], ['#C6CEAB', '浅橄榄'],
  ['#52747D', '石青', true], ['#71859E', '雾蓝', true], ['#ACA0B3', '灰紫'], ['#5E534B', '深咖', true],
];

const grid = document.querySelector('#slot-grid');
const buttons = [];
const selectedSlot = document.querySelector('#selected-slot');
const selectedHead = document.querySelector('#selected-head');
const selectedMaterial = document.querySelector('#selected-material');

function selectSlot(index) {
  const bank = Math.floor(index / 4) + 1;
  const lane = index % 4 + 1;
  buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  selectedSlot.textContent = `ACE ${bank} · 槽 ${lane}`;
  selectedHead.textContent = `喷头 ${lane}`;
  selectedMaterial.textContent = `PLA · ${colors[index][1]}`;
}

for (let bank = 0; bank < 4; bank++) {
  const row = document.createElement('div');
  row.className = 'slot-row';
  const prefix = document.createElement('span');
  prefix.textContent = `ACE ${bank + 1}`;
  row.append(prefix);
  for (let lane = 0; lane < 4; lane++) {
    const index = bank * 4 + lane;
    const [hex, name, lightInk] = colors[index];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'slot-swatch';
    button.textContent = lane + 1;
    button.setAttribute('aria-label', `ACE ${bank + 1}，槽 ${lane + 1}，${name}`);
    button.setAttribute('aria-controls', 'route-detail');
    button.style.setProperty('--slot-color', hex);
    button.style.setProperty('--slot-ink', lightInk ? '#FFFEFA' : '#302D27');
    button.addEventListener('click', () => selectSlot(index));
    button.addEventListener('keydown', (event) => {
      const offset = {ArrowUp: -4, ArrowDown: 4, ArrowLeft: -1, ArrowRight: 1}[event.key];
      if (offset === undefined || !buttons[index + offset]) return;
      event.preventDefault();
      buttons[index + offset].focus();
      selectSlot(index + offset);
    });
    buttons.push(button);
    row.append(button);
  }
  grid.append(row);
}
selectSlot(0);
