// Импорты
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import ModalConstruct from './constructor.js';
import ViewModal from './viewmodal';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Создание экземпляра объекта ViewModal
let viewModal = new ViewModal();

// Модели
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// Текстуры
const textureLoader = new THREE.TextureLoader();

let colorRed = textureLoader.load('/textures/red.jpg');
let metal = textureLoader.load('/textures/metal.jpg');
let colorPerple = textureLoader.load('/textures/perple.jpg');
let doorBrown = textureLoader.load('/textures/door.png');
let doorSilver = textureLoader.load('/textures/door_silver.png');
let doorGrey = textureLoader.load('/textures/door_grey.png');
let root = textureLoader.load('/textures/Desk_main_body_Color.png');
let screenTexture = textureLoader.load('textures/Desk_small_screen_base_col.png');

screenTexture.wrapT = THREE.RepeatWrapping;
screenTexture.wraps = THREE.RepeatWrapping;

// Создание группы для источников света
const lightHolder = new THREE.Group();

// Создание и добавление освещения
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
lightHolder.add(ambientLight);

const light = new THREE.PointLight(0xffffff, 0.6);
light.position.set(2, 3, 4);
lightHolder.add(light);

scene.add(lightHolder);

// Размеры
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Камера
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 2, 5);
scene.add(camera);

// Управление
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Рендерер
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
});
renderer.localClippingEnabled = true;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#313131', 1);

// Загрузка моделей и скрытие прелоадера после загрузки
const loadPromises = [];

// Загрузка модели стола
loadPromises.push(new Promise((resolve, reject) => {
    gltfLoader.load(
        '/models/table.glb',
        (gltf) => {
            const sceneGlb = gltf.scene;
            console.log(sceneGlb);

            let tableBase = sceneGlb.getObjectByName('Cube018');
            let screen = sceneGlb.getObjectByName('Cube018_1');
            let tableTop = sceneGlb.getObjectByName('Desk_low');
            let legs = sceneGlb.getObjectByName('feet_low');
            let tableBaseScreen = sceneGlb.getObjectByName('upper_frame_low');

            let texturesTableTop = [
                { texture: doorBrown, name: "Дерево" },
                { texture: doorSilver, name: "Серебро" },
                { texture: doorGrey, name: "Серый" },
            ];
            let texturesTableLegs = [
                { texture: metal, name: "Металл" },
                { texture: colorPerple, name: "Фиолетовый" },
                { texture: colorRed, name: "Бордовый" },
            ];
            let objects = [
                { object: tableTop, name: "Столешница" },
                { object: legs, name: "Ножки основания" },
            ];

            screen.material.map = screenTexture;

            let groupModal = new THREE.Group();
            groupModal.add(tableBaseScreen);
            groupModal.add(tableBase);
            groupModal.add(screen);
            groupModal.add(tableTop);
            groupModal.add(legs);
            groupModal.position.y = -0.5;

            scene.add(groupModal);

            tableBase.material = tableBase.material.clone();
            screen.material = screen.material.clone();
            tableTop.material = tableTop.material.clone();
            legs.material = legs.material.clone();

            screen.material.map = screenTexture;

            document.getElementById("sizes").onclick = () => {
                let containers = document.getElementsByClassName("dat-gui-container");
                viewModal.openMenu(containers)

                viewModal.settingsPosition(tableTop);
                viewModal.settingsPosition(tableBase);
                viewModal.settingsPosition(screen);
            };

            document.getElementById("textures").onclick = () => {
                let elemProduct = document.getElementById("elem_product");
                viewModal.openMenu1(elemProduct)
                elemProduct.innerHTML = "";

                objects.forEach(objectItem => {
                    const button = document.createElement("button");
                    button.textContent = objectItem.name;
                    button.onclick = () => {
                        if (objectItem.object.name === 'Desk_low') {
                            viewModal.texturesButtons(texturesTableTop, objectItem.object, "selector_textures");
                        } else if (objectItem.object.name === 'feet_low') {
                            groupModal.traverse(object => {
                                if (object instanceof THREE.Mesh && (object.name === 'feet_low' || object.name === 'Cube018')) {
                                    object.material.map = metal;
                                }
                            });
                        }
                    };
                    elemProduct.appendChild(button);
                });
            };

            gltfLoader.load(
                '/models/tableBase.glb',
                (gltf) => {
                    const tableBaseModel = gltf.scene;
                    tableBaseModel.visible = false;
                    tableBaseModel.position.y = -0.5;
                    let secondTableBase = tableBaseModel.getObjectByName('Cube018');
                    let secondScreen = tableBaseModel.getObjectByName('Cube018_1');
                    let secondTableTop = tableBaseModel.getObjectByName('Desk_low');
                    secondScreen.material.map = screenTexture;
                    viewModal.settingsPosition(secondTableTop);
                    viewModal.settingsPosition(secondTableBase);
                    viewModal.settingsPosition(secondScreen);

                    gltfLoader.load(
                        '/models/tableTop.glb',
                        (gltf) => {
                            const tableTopModel = gltf.scene;
                            tableTopModel.visible = false;
                            tableTopModel.position.y = -0.5;

                            viewModal.createNewModel(tableBaseModel, tableTopModel, sceneGlb.parent.children[2]);

                            let firstTableTop = tableTopModel.getObjectByName('Desk_low');
                            viewModal.settingsPosition(firstTableTop);
                            scene.add(tableTopModel);
                        });
                    scene.add(tableBaseModel);
                });
            scene.add(sceneGlb);

            resolve();
        },
        undefined,
        reject
    );
}));

// Скрыть прелоадер после загрузки всех моделей
Promise.all(loadPromises).then(() => {
    document.getElementById("loader").style.display = "none";
    document.querySelectorAll("button").forEach(button => {
        button.style.display = "block";
    });
}).catch(error => {
    console.error('Failed to load models', error);
    alert('Failed to load models. Please try again later.');
});

// Обновление сцены
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    lightHolder.quaternion.copy(camera.quaternion);
    window.requestAnimationFrame(tick);
};

tick();
