// This JavaScript code is written by yunusegriboz
// https://github.com/yunusegriboz

import * as THREE from 'https://cdn.skypack.dev/three@0.130.1';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/loaders/GLTFLoader.js';
// import Stats from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/libs/stats.module.js';

const scene = new THREE.Scene();
const loader = new GLTFLoader();

const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf)
// scene.add(gridHelper); // Add GridHelper to scene

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0); // 0xffffff presents white color
const canvasContainer = document.getElementById('canvas-container');
renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
canvasContainer.appendChild(renderer.domElement);

const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
});

const modelNames = [
    'susam', // Sesame
    'ustekmek', // Top bread
    'domates1', // Tomato1
    'domates2', // Tomato2
    'bacon1', // Bacon1
    'bacon2', // Bacon2
    'marul', // Lettuce
    'et1', // Meat1
    'cheedar', // Cheddar
    'et2', // Meat2
    'altekmek' // Bottom bread
];

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
light.castShadow = false;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
scene.add(light);
light.intensity = 1; // Default value is 1

const hamburger = new THREE.Group();
hamburger.position.set(0, 0, 0); // Adjusted this setting to make it visible
scene.add(hamburger);

modelNames.forEach((modelName) => {
    loader.load(`./assets/hamburgers/${modelName}.glb`, function(glb){
        const model = glb.scene;
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = false;
                child.receiveShadow = false;
            }
        });
        hamburger.add(model); // Add models to hamburger group
        console.log(`${modelName} başarıyla yüklendi.`);
    }, function(xhr){
        console.log(`${modelName}: ${(xhr.loaded/xhr.total * 100)}% yüklendi`);
    }, function(error){
        console.log(`${modelName}: yüklenirken bir hata oluştu`);
    });
});

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

/* Liner Interpolation (Doğrusal enterpolasyon)
 lerp(min, max, ratio)
 eg,
 lerp(20, 60, .5)) = 40
 lerp(-20, 60, .5)) = 20
 lerp(20, 60, .75)) = 50
 lerp(-20, -10, .1)) = -.19
*/
function lerp(x, y, a) {
    return (1 - a) * x + a * y;
}

// Sets lerps to start and end at specific scroll percentages
function scalePercent(start, end, scrollPercent) {
    return (scrollPercent - start) / (end - start);
}

const animationScripts = [];

// Shows the hamburger across the entire page
animationScripts.push({
    start: 0,
    end: 201,
    func: () => {
        let g = material.color.g;
        g -= 0.00;
        if (g <= 0) {
            g = 0.0;
        }
        material.color.g = g;
    },
});

hamburger.position.set(-1.8, -1, -3)

// Animation between 10% and 25% of the page.
animationScripts.push({
    start: 10,
    end: 25,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        hamburger.position.set(-1.8, 0, 0)
        hamburger.position.z = lerp(-1, -2.5, scalePercent(10, 25, scrollPercent));
        const ustekmekModel = hamburger.getObjectByName('ustekmek');
        if (ustekmekModel) {
            ustekmekModel.position.x = lerp(0, 0.2, scalePercent(10, 25, scrollPercent)); // Translational movement in the X axis
            ustekmekModel.position.y = lerp(0.15, 0.15, scalePercent(10, 25, scrollPercent)); // Translational movement in the Y axis
            ustekmekModel.position.z = lerp(0, 1.5, scalePercent(10, 25, scrollPercent)); // Translational movement in the Z axis
            ustekmekModel.rotation.x = lerp(0, 0.5, scalePercent(10, 25, scrollPercent)); // Rotational movement in the X axis
            ustekmekModel.rotation.y = lerp(0, 0.5, scalePercent(10, 25, scrollPercent)); // Rotational movement in the Y axis
            ustekmekModel.rotation.z = lerp(0, -0.5, scalePercent(10, 25, scrollPercent)); // Rotational movement in the Z axis
        }
        const susamModel = hamburger.getObjectByName('susam');
        if (susamModel) {
            susamModel.position.x = lerp(0, 0.2, scalePercent(10, 25, scrollPercent)); // Translational movement in the X axis
            susamModel.position.y = lerp(0.15, 0.15, scalePercent(10, 25, scrollPercent)); // Translational movement in the Y axis
            susamModel.position.z = lerp(0, 1.5, scalePercent(10, 25, scrollPercent)); // Translational movement in the Z axis
            susamModel.rotation.x = lerp(0, 0.5, scalePercent(10, 25, scrollPercent)); // Rotational movement in the X axis
            susamModel.rotation.y = lerp(0, 0.5, scalePercent(10, 25, scrollPercent)); // Rotational movement in the Y axis
            susamModel.rotation.z = lerp(0, -0.5, scalePercent(10, 25, scrollPercent)); // Rotational movement in the Z axis
        }
    },
});

// Animation between 25% and 33% of the page.
animationScripts.push({
    start: 25,
    end: 33,
    func: () => {
        const ustekmekModel = hamburger.getObjectByName('ustekmek');
        const susamModel = hamburger.getObjectByName('susam');
        if (ustekmekModel && susamModel) {
            ustekmekModel.rotation.y += 0.01;
            susamModel.rotation.y += 0.01;
            ustekmekModel.sonkonumy = ustekmekModel.rotation.y;
            susamModel.sonkonumy = susamModel.rotation.y;

        }
    },
});

// Animation between 33% and 48% of the page.
animationScripts.push({
    start: 33,
    end: 48,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const ustekmekModel = hamburger.getObjectByName('ustekmek');
        if (ustekmekModel) {
            ustekmekModel.position.x = lerp(0.2, 0, scalePercent(33, 48, scrollPercent));
            ustekmekModel.position.y = lerp(0.15, 0.15, scalePercent(33, 48, scrollPercent));
            ustekmekModel.position.z = lerp(1.5, 0, scalePercent(33, 48, scrollPercent));
            ustekmekModel.rotation.x = lerp(0.5, 0, scalePercent(33, 48, scrollPercent));
            ustekmekModel.rotation.y = lerp(ustekmekModel.sonkonumy, 0, scalePercent(33, 48, scrollPercent));
            ustekmekModel.rotation.z = lerp(-0.5, 0, scalePercent(33, 48, scrollPercent));
        }
        const susamModel = hamburger.getObjectByName('susam');
        if (susamModel) {
            susamModel.position.x = lerp(0.2, 0, scalePercent(33, 48, scrollPercent));
            susamModel.position.y = lerp(0.15, 0.15, scalePercent(33, 48, scrollPercent));
            susamModel.position.z = lerp(1.5, 0, scalePercent(33, 48, scrollPercent));
            susamModel.rotation.x = lerp(0.5, 0, scalePercent(33, 48, scrollPercent));
            susamModel.rotation.y = lerp(susamModel.sonkonumy, 0, scalePercent(33, 48, scrollPercent));
            susamModel.rotation.z = lerp(-0.5, 0, scalePercent(33, 48, scrollPercent));
        }
    },
});

// Animation between 48% and 63% of the page.
animationScripts.push({
    start: 48,
    end: 63,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const domates = hamburger.getObjectByName('domates1');
        if (domates) {
            domates.position.x = lerp(0, 0.7, scalePercent(48, 63, scrollPercent));
            domates.position.y = lerp(0.15, 0.15, scalePercent(48, 63, scrollPercent));
            domates.position.z = lerp(0, 1.7, scalePercent(48, 63, scrollPercent));
            domates.rotation.x = lerp(0, 0.5, scalePercent(48, 63, scrollPercent));
            domates.rotation.y = lerp(0, 0.5, scalePercent(48, 63, scrollPercent));
            domates.rotation.z = lerp(0, -0.5, scalePercent(48, 63, scrollPercent));
        }
    },
});

// Animation between 63% and 71% of the page.
animationScripts.push({
    start: 63,
    end: 71,
    func: () => {
        const domates = hamburger.getObjectByName('domates1');
        if (domates) {
            domates.rotation.y += 0.01;
            domates.sonkonumy = domates.rotation.y;
        }
    },
});

// Animation between 71% and 86% of the page.
animationScripts.push({
    start: 71,
    end: 86,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const domates = hamburger.getObjectByName('domates1');
        if (domates) {
            domates.position.x = lerp(0.7, 0, scalePercent(71, 86, scrollPercent));
            domates.position.y = lerp(0.15, 0.15, scalePercent(71, 86, scrollPercent));
            domates.position.z = lerp(1.7, 0, scalePercent(71, 86, scrollPercent));
            domates.rotation.x = lerp(0.5, 0, scalePercent(71, 86, scrollPercent));
            domates.rotation.y = lerp(domates.sonkonumy, 0, scalePercent(71, 86, scrollPercent));
            domates.rotation.z = lerp(-0.5, 0, scalePercent(71, 86, scrollPercent));
        }
    },
});

// Animation between 86% and 101% of the page.
animationScripts.push({
    start: 86,
    end: 101,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const et = hamburger.getObjectByName('et1');
        if (et) {
            et.position.x = lerp(0, 0.3, scalePercent(86, 101, scrollPercent));
            et.position.y = lerp(0.15, 0.15, scalePercent(86, 101, scrollPercent));
            et.position.z = lerp(0, 1.7, scalePercent(86, 101, scrollPercent));
            et.rotation.x = lerp(0, 0.5, scalePercent(86, 101, scrollPercent));
            et.rotation.y = lerp(0, 0.5, scalePercent(86, 101, scrollPercent));
            et.rotation.z = lerp(0, -0.5, scalePercent(86, 101, scrollPercent));
        }
    },
});

// Animation between 101% and 109% of the page.
animationScripts.push({
    start: 101,
    end: 109,
    func: () => {
        const et = hamburger.getObjectByName('et1');
        if (et) {
            et.rotation.y += 0.01;
            et.sonkonumy = et.rotation.y;
        }
    },
});

// Animation between 109% and 124% of the page.
animationScripts.push({
    start: 109,
    end: 124,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const et = hamburger.getObjectByName('et1');
        if (et) {
            et.position.x = lerp(0.3, 0, scalePercent(109, 124, scrollPercent));
            et.position.y = lerp(0.15, 0.15, scalePercent(109, 124, scrollPercent));
            et.position.z = lerp(1.7, 0, scalePercent(109, 124, scrollPercent));
            et.rotation.x = lerp(0.5, 0, scalePercent(109, 124, scrollPercent));
            et.rotation.y = lerp(et.sonkonumy, 0, scalePercent(109, 124, scrollPercent));
            et.rotation.z = lerp(-0.5, 0, scalePercent(109, 124, scrollPercent));
        }
    },
});

// Animation between 124% and 139% of the page.
animationScripts.push({
    start: 124,
    end: 139,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const marul = hamburger.getObjectByName('marul');
        if (marul) {
            marul.position.x = lerp(0, 0.3, scalePercent(124, 139, scrollPercent));
            marul.position.y = lerp(0.15, 0.15, scalePercent(124, 139, scrollPercent));
            marul.position.z = lerp(0, 1.7, scalePercent(124, 139, scrollPercent));
            marul.rotation.x = lerp(0, 0.5, scalePercent(124, 139, scrollPercent));
            marul.rotation.y = lerp(0, 0.5, scalePercent(124, 139, scrollPercent));
            marul.rotation.z = lerp(0, -0.5, scalePercent(124, 139, scrollPercent));
        }
    },
});

// Animation between 139% and 147% of the page.
animationScripts.push({
    start: 139,
    end: 147,
    func: () => {
        const marul = hamburger.getObjectByName('marul');
        if (marul) {
            marul.rotation.y += 0.01;
            marul.sonkonumy = marul.rotation.y;
        }
    },
});

// Animation between 147% and 162% of the page.
animationScripts.push({
    start: 147,
    end: 162,
    func: () => {
        camera.position.set(0, 1, 2);
        const marul = hamburger.getObjectByName('marul');
        if (marul) {
            marul.position.x = lerp(0.3, 0, scalePercent(147, 162, scrollPercent));
            marul.position.y = lerp(0.15, 0.15, scalePercent(147, 162, scrollPercent));
            marul.position.z = lerp(1.7, 0, scalePercent(147, 162, scrollPercent));
            marul.rotation.x = lerp(0.5, 0, scalePercent(147, 162, scrollPercent));
            marul.rotation.y = lerp(marul.sonkonumy, 0, scalePercent(147, 162, scrollPercent));
            marul.rotation.z = lerp(-0.5, 0, scalePercent(147, 162, scrollPercent));
        }
    },
});

// Animation between 162% and 177% of the page.
animationScripts.push({
    start: 162,
    end: 177,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const cheedar = hamburger.getObjectByName('cheedar');
        if (cheedar) {
            cheedar.position.x = lerp(0, 0.3, scalePercent(162, 177, scrollPercent));
            cheedar.position.y = lerp(0.15, 0.40, scalePercent(162, 177, scrollPercent));
            cheedar.position.z = lerp(0, 1.7, scalePercent(162, 177, scrollPercent));
            cheedar.rotation.x = lerp(0, 0.5, scalePercent(162, 177, scrollPercent));
            cheedar.rotation.y = lerp(0, 0.5, scalePercent(162, 177, scrollPercent));
            cheedar.rotation.z = lerp(0, -0.5, scalePercent(162, 177, scrollPercent));
        }
    },
});

// Animation between 177% and 185% of the page.
animationScripts.push({
    start: 177,
    end: 185,
    func: () => {
        const cheedar = hamburger.getObjectByName('cheedar');
        if (cheedar) {
            cheedar.rotation.y += 0.01;
            cheedar.sonkonumy = cheedar.rotation.y;
        }
    },
});

// Animation between 185% and 200% of the page.
animationScripts.push({
    start: 185,
    end: 200,
    func: () => {
        camera.position.set(0, 1, 2);
        const cheedar = hamburger.getObjectByName('cheedar');
        if (cheedar) {
            cheedar.position.x = lerp(0.3, 0, scalePercent(185, 200, scrollPercent));
            cheedar.position.y = lerp(0.40, 0.15, scalePercent(185, 200, scrollPercent));
            cheedar.position.z = lerp(1.7, 0, scalePercent(185, 200, scrollPercent));
            cheedar.rotation.x = lerp(0.5, 0, scalePercent(185, 200, scrollPercent));
            cheedar.rotation.y = lerp(cheedar.sonkonumy, 0, scalePercent(185, 200, scrollPercent));
            cheedar.rotation.z = lerp(-0.5, 0, scalePercent(185, 200, scrollPercent));
        }
    },
});

// Animation between 199% and 201% of the page.
animationScripts.push({
    start: 199,
    end: 201,
    func: () => {
        camera.position.set(0, 1, 2);
        hamburger.position.z = lerp(-2, -1.5, scalePercent(199, 201, scrollPercent));
        hamburger.rotation.y += 0.01;
    },
});



function playScrollAnimations() {
    animationScripts.forEach((a) => {
        if (scrollPercent >= a.start && scrollPercent < a.end) {
            a.func();
        }
    });
}

let scrollPercent = 0; // Start scrollpercentage

document.body.onscroll = () => {
// Calculate current scroll amount in percentage
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        200;
    (document.getElementById('scrollProgress')).innerText =
        'Kaydırma Miktarı : ' + scrollPercent.toFixed(2);
};
// const stats = new Stats(); // Show performance using Stats.js
// document.body.appendChild(stats.dom); // Show performance using Stats.js

function animate() {
    requestAnimationFrame(animate);

    playScrollAnimations();

    render();

    // stats.update(); // Show performance using Stats.js
}

function render() {
    renderer.render(scene, camera);
}

window.scrollTo({ top: 0, behavior: 'smooth' });
animate();

