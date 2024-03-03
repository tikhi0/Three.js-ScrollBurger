// This JavaScript code is written by tikhi
// https://github.com/tikhi0

import * as THREE from 'https://cdn.skypack.dev/three@0.130.1';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/loaders/GLTFLoader.js';
// import Stats from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/libs/stats.module.js';

const scene = new THREE.Scene();
const loader = new GLTFLoader();

const gridHelper = new THREE.GridHelper(10, 10, 0xaec6cf, 0xaec6cf)
// scene.add(gridHelper); // GridHelper'ı sahneye ekle

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0); // 0xffffff beyaz rengi temsil eder
const canvasContainer = document.getElementById('canvas-container');
renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
canvasContainer.appendChild(renderer.domElement);

const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
});

const modelNames = [
    'susam',
    'ustekmek',
    'domates1',
    'domates2',
    'bacon1',
    'bacon2',
    'marul',
    'et1',
    'cheedar',
    'et2',
    'altekmek'
];

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
light.castShadow = false;
light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;
scene.add(light);
light.intensity = 1; // Default değeri 1 dir

const hamburger = new THREE.Group();
hamburger.position.set(0, 0, 0); // Başlangıçta görünür hale getirmek için bu konuma ayarlandı
scene.add(hamburger);

modelNames.forEach((modelName) => {
    loader.load(`../assets/hamburgers/${modelName}.glb`, function(glb){
        const model = glb.scene;
        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = false;
                child.receiveShadow = false;
            }
        });
        hamburger.add(model); // Modelleri hamburger grubuna ekle
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

// Lerp'leri belirli kaydırma yüzdelerinde başlayacak ve bitecek şekilde ayalar
function scalePercent(start, end, scrollPercent) {
    return (scrollPercent - start) / (end - start);
}

const animationScripts = [];

// hamburgeri sayfanın tamamı boyunca gösterir
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

// Sayfanın %10'u ile %25'i arasındaki animasyon.
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
            ustekmekModel.position.x = lerp(0, 0.2, scalePercent(10, 25, scrollPercent)); // X ekseninde ötelenme hareketi
            ustekmekModel.position.y = lerp(0.15, 0.15, scalePercent(10, 25, scrollPercent)); // Y ekseninde ötelenme hareketi
            ustekmekModel.position.z = lerp(0, 1.5, scalePercent(10, 25, scrollPercent)); // Z ekseninde ötelenme hareketi
            ustekmekModel.rotation.x = lerp(0, 0.5, scalePercent(10, 25, scrollPercent)); // X ekseninde dönme hareketi
            ustekmekModel.rotation.y = lerp(0, 0.5, scalePercent(10, 25, scrollPercent)); // Y ekseninde dönme hareketi
            ustekmekModel.rotation.z = lerp(0, -0.5, scalePercent(10, 25, scrollPercent)); // Z ekseninde dönme hareketi
        }
        const susamModel = hamburger.getObjectByName('susam');
        if (susamModel) {
            susamModel.position.x = lerp(0, 0.2, scalePercent(10, 25, scrollPercent)); // X ekseninde ötelenme hareketi
            susamModel.position.y = lerp(0.15, 0.15, scalePercent(10, 25, scrollPercent)); // Y ekseninde ötelenme hareketi
            susamModel.position.z = lerp(0, 1.5, scalePercent(10, 25, scrollPercent)); // Z ekseninde ötelenme hareketi
            susamModel.rotation.x = lerp(0, 0.5, scalePercent(10, 25, scrollPercent)); // X ekseninde dönme hareketi
            susamModel.rotation.y = lerp(0, 0.5, scalePercent(10, 25, scrollPercent)); // Y ekseninde dönme hareketi
            susamModel.rotation.z = lerp(0, -0.5, scalePercent(10, 25, scrollPercent)); // Z ekseninde dönme hareketi
        }
    },
});

// Sayfanın %25'i ile %33'ü arasındaki üstteki ekmeğin dönme hareketi.
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

// Sayfanın %33'ü ile %48'i arasındaki animasyon.
animationScripts.push({
    start: 33,
    end: 48,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const ustekmekModel = hamburger.getObjectByName('ustekmek');
        if (ustekmekModel) {
            ustekmekModel.position.x = lerp(0.2, 0, scalePercent(33, 48, scrollPercent)); // X ekseninde ötelenme hareketi
            ustekmekModel.position.y = lerp(0.15, 0.15, scalePercent(33, 48, scrollPercent)); // Y ekseninde ötelenme hareketi
            ustekmekModel.position.z = lerp(1.5, 0, scalePercent(33, 48, scrollPercent)); // Z ekseninde ötelenme hareketi
            ustekmekModel.rotation.x = lerp(0.5, 0, scalePercent(33, 48, scrollPercent)); // X ekseninde dönme hareketi
            ustekmekModel.rotation.y = lerp(ustekmekModel.sonkonumy, 0, scalePercent(33, 48, scrollPercent)); // Y ekseninde dönme hareketi
            ustekmekModel.rotation.z = lerp(-0.5, 0, scalePercent(33, 48, scrollPercent)); // Z ekseninde dönme hareketi
        }
        const susamModel = hamburger.getObjectByName('susam');
        if (susamModel) {
            susamModel.position.x = lerp(0.2, 0, scalePercent(33, 48, scrollPercent)); // X ekseninde ötelenme hareketi
            susamModel.position.y = lerp(0.15, 0.15, scalePercent(33, 48, scrollPercent)); // Y ekseninde ötelenme hareketi
            susamModel.position.z = lerp(1.5, 0, scalePercent(33, 48, scrollPercent)); // Z ekseninde ötelenme hareketi
            susamModel.rotation.x = lerp(0.5, 0, scalePercent(33, 48, scrollPercent)); // X ekseninde dönme hareketi
            susamModel.rotation.y = lerp(susamModel.sonkonumy, 0, scalePercent(33, 48, scrollPercent)); // Y ekseninde dönme hareketi
            susamModel.rotation.z = lerp(-0.5, 0, scalePercent(33, 48, scrollPercent)); // Z ekseninde dönme hareketi
        }
    },
});

// Sayfanın %48'i ile %63'ü arasındaki animasyon.
animationScripts.push({
    start: 48,
    end: 63,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const domates = hamburger.getObjectByName('domates1');
        if (domates) {
            domates.position.x = lerp(0, 0.7, scalePercent(48, 63, scrollPercent)); // X ekseninde ötelenme hareketi
            domates.position.y = lerp(0.15, 0.15, scalePercent(48, 63, scrollPercent)); // Y ekseninde ötelenme hareketi
            domates.position.z = lerp(0, 1.7, scalePercent(48, 63, scrollPercent)); // Z ekseninde ötelenme hareketi
            domates.rotation.x = lerp(0, 0.5, scalePercent(48, 63, scrollPercent)); // X ekseninde dönme hareketi
            domates.rotation.y = lerp(0, 0.5, scalePercent(48, 63, scrollPercent)); // Y ekseninde dönme hareketi
            domates.rotation.z = lerp(0, -0.5, scalePercent(48, 63, scrollPercent)); // Z ekseninde dönme hareketi
        }
    },
});

// Sayfanın %63'ü ile %71'i arasındaki domatesin dönme hareketi.
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

// Sayfanın %71'i ile %86'sı arasındaki animasyon.
animationScripts.push({
    start: 71,
    end: 86,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const domates = hamburger.getObjectByName('domates1');
        if (domates) {
            domates.position.x = lerp(0.7, 0, scalePercent(71, 86, scrollPercent)); // X ekseninde ötelenme hareketi
            domates.position.y = lerp(0.15, 0.15, scalePercent(71, 86, scrollPercent)); // Y ekseninde ötelenme hareketi
            domates.position.z = lerp(1.7, 0, scalePercent(71, 86, scrollPercent)); // Z ekseninde ötelenme hareketi
            domates.rotation.x = lerp(0.5, 0, scalePercent(71, 86, scrollPercent)); // X ekseninde dönme hareketi
            domates.rotation.y = lerp(domates.sonkonumy, 0, scalePercent(71, 86, scrollPercent)); // Y ekseninde dönme hareketi
            domates.rotation.z = lerp(-0.5, 0, scalePercent(71, 86, scrollPercent)); // Z ekseninde dönme hareketi
        }
    },
});

// Sayfanın %86'sı ile %101'i arasındaki animasyon.
animationScripts.push({
    start: 86,
    end: 101,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const et = hamburger.getObjectByName('et1');
        if (et) {
            et.position.x = lerp(0, 0.3, scalePercent(86, 101, scrollPercent)); // X ekseninde ötelenme hareketi
            et.position.y = lerp(0.15, 0.15, scalePercent(86, 101, scrollPercent)); // Y ekseninde ötelenme hareketi
            et.position.z = lerp(0, 1.7, scalePercent(86, 101, scrollPercent)); // Z ekseninde ötelenme hareketi
            et.rotation.x = lerp(0, 0.5, scalePercent(86, 101, scrollPercent)); // X ekseninde dönme hareketi
            et.rotation.y = lerp(0, 0.5, scalePercent(86, 101, scrollPercent)); // Y ekseninde dönme hareketi
            et.rotation.z = lerp(0, -0.5, scalePercent(86, 101, scrollPercent)); // Z ekseninde dönme hareketi
        }
    },
});

// Sayfanın %101'i ile %109'u arasındaki animasyon.
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

// Sayfanın %109'u ile %124'ü arasındaki animasyon.
animationScripts.push({
    start: 109,
    end: 124,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const et = hamburger.getObjectByName('et1');
        if (et) {
            et.position.x = lerp(0.3, 0, scalePercent(109, 124, scrollPercent)); // X ekseninde ötelenme hareketi
            et.position.y = lerp(0.15, 0.15, scalePercent(109, 124, scrollPercent)); // Y ekseninde ötelenme hareketi
            et.position.z = lerp(1.7, 0, scalePercent(109, 124, scrollPercent)); // Z ekseninde ötelenme hareketi
            et.rotation.x = lerp(0.5, 0, scalePercent(109, 124, scrollPercent)); // X ekseninde dönme hareketi
            et.rotation.y = lerp(et.sonkonumy, 0, scalePercent(109, 124, scrollPercent)); // Y ekseninde dönme hareketi
            et.rotation.z = lerp(-0.5, 0, scalePercent(109, 124, scrollPercent)); // Z ekseninde dönme hareketi
        }
    },
});

// Sayfanın %124'ü ile %139'u arasındaki animasyon.
animationScripts.push({
    start: 124,
    end: 139,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const marul = hamburger.getObjectByName('marul');
        if (marul) {
            marul.position.x = lerp(0, 0.3, scalePercent(124, 139, scrollPercent)); // X ekseninde ötelenme hareketi
            marul.position.y = lerp(0.15, 0.15, scalePercent(124, 139, scrollPercent)); // Y ekseninde ötelenme hareketi
            marul.position.z = lerp(0, 1.7, scalePercent(124, 139, scrollPercent)); // Z ekseninde ötelenme hareketi
            marul.rotation.x = lerp(0, 0.5, scalePercent(124, 139, scrollPercent)); // X ekseninde dönme hareketi
            marul.rotation.y = lerp(0, 0.5, scalePercent(124, 139, scrollPercent)); // Y ekseninde dönme hareketi
            marul.rotation.z = lerp(0, -0.5, scalePercent(124, 139, scrollPercent)); // Z ekseninde dönme hareketi
        }
    },
});

// Sayfanın %139'u ile %147'si arasındaki animasyon.
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

// Sayfanın %147'si ile %162'si arasındaki animasyon.
animationScripts.push({
    start: 147,
    end: 162,
    func: () => {
        camera.position.set(0, 1, 2);
        const marul = hamburger.getObjectByName('marul');
        if (marul) {
            marul.position.x = lerp(0.3, 0, scalePercent(147, 162, scrollPercent)); // X ekseninde ötelenme hareketi
            marul.position.y = lerp(0.15, 0.15, scalePercent(147, 162, scrollPercent)); // Y ekseninde ötelenme hareketi
            marul.position.z = lerp(1.7, 0, scalePercent(147, 162, scrollPercent)); // Z ekseninde ötelenme hareketi
            marul.rotation.x = lerp(0.5, 0, scalePercent(147, 162, scrollPercent)); // X ekseninde dönme hareketi
            marul.rotation.y = lerp(marul.sonkonumy, 0, scalePercent(147, 162, scrollPercent)); // Y ekseninde dönme hareketi
            marul.rotation.z = lerp(-0.5, 0, scalePercent(147, 162, scrollPercent)); // Z ekseninde dönme hareketi
        }
    },
});

// Sayfanın %162'si ile %177'si arasındaki animasyon.
animationScripts.push({
    start: 162,
    end: 177,
    func: () => {
        camera.lookAt(0, 1, 0);
        camera.position.set(0, 1, 2);
        const cheedar = hamburger.getObjectByName('cheedar');
        if (cheedar) {
            cheedar.position.x = lerp(0, 0.3, scalePercent(162, 177, scrollPercent)); // X ekseninde ötelenme hareketi
            cheedar.position.y = lerp(0.15, 0.40, scalePercent(162, 177, scrollPercent)); // Y ekseninde ötelenme hareketi
            cheedar.position.z = lerp(0, 1.7, scalePercent(162, 177, scrollPercent)); // Z ekseninde ötelenme hareketi
            cheedar.rotation.x = lerp(0, 0.5, scalePercent(162, 177, scrollPercent)); // X ekseninde dönme hareketi
            cheedar.rotation.y = lerp(0, 0.5, scalePercent(162, 177, scrollPercent)); // Y ekseninde dönme hareketi
            cheedar.rotation.z = lerp(0, -0.5, scalePercent(162, 177, scrollPercent)); // Z ekseninde dönme hareketi
        }
    },
});

// Sayfanın %177'si ile %185'i arasındaki animasyon.
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

// Sayfanın %185'i ile %200'ü arasındaki animasyon.
animationScripts.push({
    start: 185,
    end: 200,
    func: () => {
        camera.position.set(0, 1, 2);
        const cheedar = hamburger.getObjectByName('cheedar');
        if (cheedar) {
            cheedar.position.x = lerp(0.3, 0, scalePercent(185, 200, scrollPercent)); // X ekseninde ötelenme hareketi
            cheedar.position.y = lerp(0.40, 0.15, scalePercent(185, 200, scrollPercent)); // Y ekseninde ötelenme hareketi
            cheedar.position.z = lerp(1.7, 0, scalePercent(185, 200, scrollPercent)); // Z ekseninde ötelenme hareketi
            cheedar.rotation.x = lerp(0.5, 0, scalePercent(185, 200, scrollPercent)); // X ekseninde dönme hareketi
            cheedar.rotation.y = lerp(cheedar.sonkonumy, 0, scalePercent(185, 200, scrollPercent)); // Y ekseninde dönme hareketi
            cheedar.rotation.z = lerp(-0.5, 0, scalePercent(185, 200, scrollPercent)); // Z ekseninde dönme hareketi
        }
    },
});

// Sayfanın %199'u ile %201'i arasındaki animasyon.
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

let scrollPercent = 0; // Kaydırma yüzdesini başlat

document.body.onscroll = () => {
// mevcut kaydırma miktarını yüzde olarak hesapla
    scrollPercent =
        ((document.documentElement.scrollTop || document.body.scrollTop) /
            ((document.documentElement.scrollHeight ||
                document.body.scrollHeight) -
                document.documentElement.clientHeight)) *
        200;
    (document.getElementById('scrollProgress')).innerText =
        'Kaydırma Miktarı : ' + scrollPercent.toFixed(2);
};
// const stats = new Stats(); // Stats.js'i kullanarak performansı göster
// document.body.appendChild(stats.dom); // Stats.js'i kullanarak performansı göster

function animate() {
    requestAnimationFrame(animate);

    playScrollAnimations();

    render();

    // stats.update(); // Stats.js'i kullanarak performansı göster
}

function render() {
    renderer.render(scene, camera);
}

window.scrollTo({ top: 0, behavior: 'smooth' });
animate();

