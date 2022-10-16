import {colors, sizeClass, sizes, eraserClass, eraserSizes, colorClass} from '../../../helpers/utils';
import Component from '../../../views/component';

import Error404 from '../../../views/pages/error404';

import Images from '../../../models/images';


class Coloring extends Component {
    static async getData() {
        return await Images.getImage(this.urlParts.id);
    }

    static async render(image) {
        let html;

        if (!image.error) {
            const {svg} = image;

            html = `
                <div class ="coloring">
                 ${svg}         
                </div>
                
                <div class="toolbox">
                    <ul class="hide" id="color-menu">
                         ${colorClass.map(color => this.getColor(color)).join('')}
                    </ul>
                    
                    <ul class="hide" id="size">
                        ${sizeClass.map(size => this.getSizeClass(size)).join('')}
                    </ul>
                    
                    <ul class="hide" id="eraser-size">
                        ${eraserClass.map(size => this.getEraserSizeClass(size)).join('')}
                    </ul>
                    
                    <div class="toolbox__button-sound"></div>
                    
                    <img class="toolbox__sound" src="img/png/button-sound.png" alt="Здесь изображена кнопка звука">
                    <img class="toolbox__off" src="img/png/off.png" alt="Здесь изображена кнопка выключенного звука">
                    
                    <button class="toolbox__clear">Очистить</button>
                    <button class="toolbox__random">?</button>
                    <button class="toolbox__button-palette">Цвет</button>
                    
                    <img class="toolbox__brush" src="img/svg/brush.svg" alt="Здесь изображена кисть">
                    <img class="toolbox__pencil" src="img/svg/pencil.svg" alt="Здесь изображен карандаш">
                    <img class="toolbox__eraser" src="img/svg/eraser.svg" alt="Здесь изображен ластик">
                    
                    <audio loop src="sounds/sound.mp3" ></audio>
                
                
                </div>
            `;

        } else {
            html = Error404.render();
        }

        return html;
    }

    static afterRender() {
        this.setActions();
    }

    static setActions() {
        const toolboxContainer = document.getElementsByClassName('toolbox')[0],
            colorMenu = toolboxContainer.getElementsByTagName('ul')[0],
            buttonPalette = toolboxContainer.getElementsByClassName('toolbox__button-palette')[0],
            buttonBrush = toolboxContainer.getElementsByClassName('toolbox__brush')[0],
            buttonRandom = toolboxContainer.getElementsByClassName('toolbox__random')[0],
            buttonPencil = toolboxContainer.getElementsByClassName('toolbox__pencil')[0],
            buttonEraser = toolboxContainer.getElementsByClassName('toolbox__eraser')[0],
            svg = document.getElementsByTagName('svg')[0],
            paths = svg.querySelectorAll('#path path'),
            svgPath = document.getElementById('path'),
            svgBlock = document.getElementById('block'),
            menuSize = toolboxContainer.getElementsByTagName('ul')[1],
            menuSizes = toolboxContainer.querySelectorAll('#size li'),
            menuColors = toolboxContainer.querySelectorAll('#color-menu li'),
            menuEraser = toolboxContainer.getElementsByTagName('ul')[2],
            menuEraserSizes = toolboxContainer.querySelectorAll('#eraser-size li'),
            audio = toolboxContainer.getElementsByTagName('audio')[0],
            buttonOff = toolboxContainer.getElementsByClassName('toolbox__off')[0],
            clonedSvgPath = svgPath.cloneNode(true),
            clonedSvgBlock = svgBlock.cloneNode(true);


        let colorCurrent,
            colorPencil = 'black',
            sizeCurrent,
            sizePencilCurrent = '20',
            sizeEraserCurrent = '26',
            isDrawing = false,
            x = 0,
            y = 0,
            index = 0,
            buttonPaletteColor,
            points;

        this.addColorCurrent(colorMenu.children[1]);
        this.addSizeCurrent(menuSize.children[2]);
        this.addSizeEraserCurrent(menuEraser.children[1]);
        this.addOpacity(paths);
        this.addDataSize(menuSizes);
        this.addDataEraserSize(menuEraserSizes);
        this.addDataColor(menuColors);


        toolboxContainer.onclick = evt => {
            const target = evt.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('toolbox__button-palette'):
                    this.showColorMenu(colorMenu, buttonPalette);
                    this.removeMenuSize(menuSize);
                    this.removeMenuEraser(menuEraser);
                    this.removeButtonRandomActive(buttonRandom);
                    break;

                case targetClassList.contains('toolbox__brush'):
                    this.removeButtonRandomActive(buttonRandom);
                    this.removeClass(svg);
                    this.addCursorBrush(svg);
                    this.removeToolActive(buttonPencil, buttonEraser);
                    this.removeColorMenu(colorMenu, buttonPalette);
                    this.addToolActive(buttonBrush);
                    this.removeMenuSize(menuSize);
                    this.removeMenuEraser(menuEraser);
                    break;

                case targetClassList.contains('toolbox__pencil'):
                    this.removeButtonRandomActive(buttonRandom);
                    this.removeClass(svg);
                    this.addCursorPencil(svg);
                    this.removeToolActive(buttonBrush, buttonEraser);
                    this.removeColorMenu(colorMenu, buttonPalette);
                    this.addToolActive(buttonPencil);
                    this.showMenuSize(menuSize);
                    this.removeMenuEraser(menuEraser);
                    break;

                case targetClassList.contains('toolbox__eraser'):
                    this.removeButtonRandomActive(buttonRandom);
                    this.removeClass(svg);
                    this.addCursorEraser(svg);
                    this.removeToolActive(buttonBrush, buttonPencil);
                    this.removeColorMenu(colorMenu, buttonPalette);
                    this.addToolActive(buttonEraser);
                    this.removeMenuSize(menuSize);
                    this.showMenuEraser(menuEraser);
                    break;

                case targetClassList.contains('toolbox__button-sound'):
                    this.playSound(audio, buttonOff);
                    break;

                case targetClassList.contains('toolbox__clear'):
                    this.clearSvg(svg, svgPath, clonedSvgBlock);
                    this.removeButtonRandomActive(buttonRandom);
                    this.removeToolActive(buttonBrush, buttonEraser);
                    this.removeColorMenu(colorMenu, buttonPalette);
                    this.removeToolActive(buttonBrush, buttonPencil);
                    this.removeMenuSize(menuSize);
                    this.removeMenuEraser(menuEraser);
                    this.removeClass(svg);
                    break;

                case targetClassList.contains('toolbox__random'):
                    this.addButtonRandomActive(buttonRandom);
                    this.addRandomColor(buttonRandom, colors, clonedSvgPath, svg, svgBlock);
                    this.removeToolActive(buttonBrush, buttonEraser);
                    this.removeColorMenu(colorMenu, buttonPalette);
                    this.removeToolActive(buttonBrush, buttonPencil);
                    this.removeMenuSize(menuSize);
                    this.removeMenuEraser(menuEraser);
                    this.removeClass(svg);
                    break;
            }

        };

        // Выбор цвета
        colorMenu.onclick = evt => {
            const target = evt.target;

            colorMenu.querySelectorAll('li').forEach(li => {
                li.classList.remove('toolbox__color-menu__active');
            });

            if (target.tagName === 'LI') {
                this.addColorCurrent(target);
                colorPencil = target.dataset.color;

                buttonPaletteColor = target.className;
                buttonPaletteColor =  buttonPaletteColor.split('').splice(0, 7).join('');
            }

            buttonPalette.removeAttribute('class');
            buttonPalette.classList.add('toolbox__button-palette');
            buttonPalette.classList.add('toolbox__button-palette__active');
            buttonPalette.classList.add( buttonPaletteColor);
        };

        // Выбор размера карандаша
        menuSize.onclick = evt => {
            const target = evt.target;

            menuSize.querySelectorAll('li').forEach(li => {
                li.classList.remove('active');
            });

            if (target.tagName === 'LI') {
                this.addSizeCurrent(target);
                sizePencilCurrent = target.dataset.size;
            }
        };

        // Выбор размера ластика
        menuEraser.onclick = evt => {
            const target = evt.target;

            menuEraser.querySelectorAll('li').forEach(li => {
                li.classList.remove('active');
            });

            if (target.tagName === 'LI') {
                this.addSizeEraserCurrent(target);
                sizeEraserCurrent = target.dataset.size;
            }
        };


        // Работа с кистью
        svg.onclick = evt => {
            if (buttonBrush.classList.contains('toolbox__active')) {

                const target = evt.target;
                colorCurrent = colorPencil;

                if (target.tagName === 'path') {

                    target.setAttribute('fill-opacity', '1');
                    target.style.fill = `${colorCurrent}`;

                    const path = target.cloneNode(true);

                    path.setAttribute('fill-opacity', '0');
                    svgPath.appendChild(path);
                    svg.appendChild(target);
                    svg.appendChild(svgBlock);
                }


            }

        };

        // Работа с карандашом и ластиком
        svg.onmousedown = evt => {
            points = [];
            index += 1;
            x = evt.offsetX;
            y = evt.offsetY;
            isDrawing = true;
            points.push(`${x}`, `${y}`);

            if (buttonPencil.classList.contains('toolbox__active')) {
                colorCurrent = colorPencil;
                sizeCurrent = sizePencilCurrent;
                this.drawPolyline(svg, index, colorCurrent, sizeCurrent, points, x, y);
                this.getSvg(svgPath, svg, svgBlock);

            }

            if (buttonEraser.classList.contains('toolbox__active')) {
                colorCurrent = 'white';
                sizeCurrent = sizeEraserCurrent;
                this.drawPolyline(svg, index, colorCurrent, sizeCurrent, points, x, y);
                this.getSvg(svgPath, svg, svgBlock);
            }
        };

        svg.onmousemove = evt => {
            if (buttonPencil.classList.contains('toolbox__active')
                || buttonEraser.classList.contains('toolbox__active')) {
                if (isDrawing) {
                    x = evt.offsetX;
                    y = evt.offsetY;
                    points.push(`${x}`, `${y}`);

                    svg.getElementById(`${index}`).setAttribute('points', points);

                    if (svg.lastElementChild.getAttribute('id') === 'path') {
                        svg.removeChild(svg.lastElementChild);
                    }
                }
            }
        };

        svg.onmouseup = () => {
            isDrawing = false;
        };
    }

    static addToolActive(tool) {
        tool.classList.add('toolbox__active');
    }

    static removeToolActive(toolOne, toolTwo) {
        toolOne.classList.remove('toolbox__active');
        toolTwo.classList.remove('toolbox__active');
    }

    static showColorMenu(colorMenu, buttonPalette) {
        colorMenu.classList.toggle('toolbox__color-menu');
        colorMenu.classList.toggle('hide');
        buttonPalette.classList.toggle('toolbox__button-palette__active');
    }

    static showMenuSize(menuSize) {
        menuSize.classList.toggle('menu-size');
        menuSize.classList.toggle('hide');
    }

    static showMenuEraser(menuEraser) {
        menuEraser.classList.toggle('menu-eraser');
        menuEraser.classList.toggle('hide');
    }


    static removeColorMenu(colorMenu, buttonPalette) {
        colorMenu.classList.add('hide');
        colorMenu.classList.remove('toolbox__color-menu');
        buttonPalette.classList.remove('toolbox__button-palette__active');

    }

    static addButtonRandomActive(buttonRandom) {
        buttonRandom.classList.toggle('toolbox__random__active');
    }

    static removeButtonRandomActive(buttonRandom) {
        buttonRandom.classList.remove('toolbox__random__active');
    }

    static removeMenuSize(menuSize) {
        menuSize.classList.add('hide');
        menuSize.classList.remove('menu-size');
    }

    static removeMenuEraser(menuEraser) {
        menuEraser.classList.add('hide');
        menuEraser.classList.remove('menu-eraser');
    }


    static addColorCurrent(colorCurrent) {
        colorCurrent.classList.add('toolbox__color-menu__active');
    }

    static addSizeCurrent(sizeCurrent) {
        sizeCurrent.classList.add('active');
    }

    static addSizeEraserCurrent(sizeEraserCurrent) {
        sizeEraserCurrent.classList.add('active');
    }

    static getColor(color) {
        return `
        <li data-color="${color}" class="${color}"></li>
        `;
    }

    static getSizeClass(size) {
        return `
           <li class="${size}"></li>
        `;
    }

    static getEraserSizeClass(size) {
        return `
            <li class="${size}"></li>
        `;
    }

    static addOpacity(paths) {

        paths.forEach(path => {
            path.setAttribute('fill-opacity', '0');
        });

    }

    static addCursorBrush(svg) {
        svg.classList.add('brush');
    }

    static addCursorPencil(svg) {
        svg.classList.add('pencil');
    }

    static addCursorEraser(svg) {
        svg.classList.add('eraser');
    }

    static removeClass(svg) {
        svg.removeAttribute('class');
    }

    static addDataSize(menuSizes) {
        menuSizes.forEach((li, i) => {
            li.dataset.size = sizes[i];
        });

    }

    static addDataColor(menuColors) {
        menuColors.forEach((li, i) => {
            li.dataset.color = colors[i];
        });

    }

    static addDataEraserSize(menuEraserSizes) {
        menuEraserSizes.forEach((li, i) => {
            li.dataset.size = eraserSizes[i];
        });

    }

    static drawPolyline(svg, index, colorCurrent, sizeCurrent, points, x, y) {
        svg.innerHTML += `<polyline id = "${index}" fill="none" stroke="${colorCurrent}" stroke-linecap="round"` +
            `stroke-linejoin="round" stroke-width="${sizeCurrent}" points = "` + `${points} ` + '"/>' +
            `<circle cx = "${x}" cy = "${y}" r = "${sizeCurrent / 2}" fill = "${colorCurrent}"/>`;
    }

    static getSvg(svgPath, svg, svgBlock) {
        const clonedBlock = svgBlock.cloneNode(true);
        const clonedSvgPath = svgPath.cloneNode(true);


        document.querySelector('#path').remove();
        document.querySelector('#block').remove();
        svg.appendChild(clonedSvgPath);
        svg.appendChild(clonedBlock);
    }

    static playSound(audio, buttonOff) {
        buttonOff.classList.toggle('hide');
        buttonOff.classList.contains('hide') ? audio.play() : audio.pause();
    }

    static clearSvg(svg, svgPath, clonedSvgBlock) {
        const clonedSvgPath = svgPath.cloneNode(true);
        svg.innerHTML = '';
        svg.appendChild(clonedSvgPath);
        svg.appendChild(clonedSvgBlock);
    }

    static insertCircle(svg, colorPencil) {
        svg.innerHTML += `<circle id = "circle" cx = "50" cy = "50" r = "18" fill = "${colorPencil}"/>`;

    }

    static addRandomColor(buttonRandom, colors, clonedSvgPath, svg, svgBlock) {
        if (buttonRandom.classList.contains('toolbox__random__active')) {

            clonedSvgPath.setAttribute('id', 'random');

            const path = clonedSvgPath.querySelectorAll('path');
            const randomColors = Array.from({length: path.length}, () => colors[Math.floor(Math.random() * colors.length)]);

            clonedSvgPath.querySelectorAll('path').forEach((path, i) => {
                path.setAttribute('fill-opacity', '1');
                path.style.fill = randomColors[i];
            });
            svg.appendChild(clonedSvgPath);
            svg.appendChild(svgBlock);
        }
    }
}


export default Coloring;