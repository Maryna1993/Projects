import Component from '../../../views/component';

import Images from '../../../models/images';

class SelectImages extends Component {
    static async getData() {
        return await Images.getImages();
    }

    static async render(images) {
        return `     
            <main class="images-select">

                    ${images.map(image => this.getImage(image)).join('\n ')}
                
            </main>
                        
        `;
    }

    static afterRender() {
        this.setActions();
    }

    static setActions() {
        const imageContainer = document.getElementsByClassName('content-container')[0];

        imageContainer.onclick = evt => {
            const target = evt.target,
                targetClassList = target.classList;

            if (targetClassList.contains('images-select__block')) {
                this.redirectToColoring(target.dataset.id);

            }

        };
    }

    static getImage(image) {
        return `
             <div class="images-select__list" >
                  <div class="images-select__block" data-id="${image.id}"></div>
                       ${image.svg}
             </div>
        `;
    }

    static redirectToColoring(id) {
        location.hash = `#/image/${id}`;
    }


}

export default SelectImages;