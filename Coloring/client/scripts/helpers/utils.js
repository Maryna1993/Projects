 export const parseCurrentURL = () => {
    const urlParts = {};

    [urlParts.page, urlParts.id] = location.hash.slice(2).split('/');

    return urlParts;
};


 export const colors = ['#ff0000', '#000000', '#ffbf00', '#2E8B57', '#80ffff', '#0040ff', '#d9ccff',
                        '#990000', '#A52A2A', '#ff6000', '#59b300', '#00e6e6', '#000099', '#867979',
                        '#ffa366', '#FFE4E1', '#ffad33', '#80ff00', '#ccffff', '#bd7599', '#ccccb3',
                        '#e0926c', '#ffd24d', '#ffff33', '#00ff55', '#1affb2', '#ff99c2', '#a3a375',
                        '#ff0040', '#cc9900', '#ffff00', '#00e600', '#008080', '#ff4d94', '#999966',
                        '#990026', '#cc6600', '#cccc00', '#006600', '#004d33', '#800080', '#4d4d4d',
                        '#4d0000', '#662200', '#808000', '#003300', '#002e4d', '#330033', 'grey'
                       ];

 export const sizeClass = ['size1','size2', 'size3', 'size4', 'size5'];
 export const sizes = ['55', '32', '20', '10', '5'];

 export const eraserClass = ['eraser1', 'eraser2', 'eraser3'];
 export const eraserSizes = ['60', '26', '8'];

 export const colorClass = ['color01','color02', 'color03', 'color04', 'color05', 'color06', 'color07', 'color08',
                            'color09', 'color10', 'color11', 'color12', 'color13', 'color14', 'color15', 'color16',
                            'color17', 'color18', 'color19', 'color20', 'color21', 'color22', 'color23', 'color24',
                            'color25', 'color26', 'color27', 'color28', 'color29', 'color30', 'color31','color32',
                            'color33', 'color34', 'color35', 'color36', 'color37', 'color38', 'color39', 'color40',
                            'color41', 'color42','color43',  'color44', 'color45', 'color46', 'color47', 'color48',
                            'color49'];