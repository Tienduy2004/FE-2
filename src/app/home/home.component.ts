import {Component, inject, OnInit,ElementRef, ViewChild} from '@angular/core';
import {ListProductsComponent} from "../list-products/list-products.component";
import {CommonModule} from "@angular/common";
import {Product} from "../product";
import {ProductService} from "../product.service";
import {AboutComponent} from "../about/about.component";
import AOS from 'aos';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListProductsComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit{
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private shoeModel!: THREE.Group;
  private mouse = new THREE.Vector2();
  private prevMouse = new THREE.Vector2();


  constructor() { }

  ngOnInit(): void {
    this.initScene();
    this.loadShoeModel();
    this.animate();
    AOS.init();
  }

  private initScene(): void {
    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 100 / 100, 0.1, 1000);
    this.camera.position.z = 7;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0); // Clear color trong suốt và không có màu
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.renderer.domElement.addEventListener('mousedown', (event) => this.onMouseDown(event));
    this.renderer.domElement.addEventListener('mouseup', () => this.onMouseUp());
    this.renderer.domElement.addEventListener('mousemove', (event) => this.onMouseMove(event));

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    this.scene.add(directionalLight);
  }

  private loadShoeModel(): void {
    const loader = new GLTFLoader();
    loader.load(
      'assets/models/uploads_files_4881695_model.glb',
      (gltf) => {
        this.shoeModel = gltf.scene;
        // Tăng kích thước của mô hình
        this.shoeModel.scale.set(4, 4, 4); // Thay đổi giá trị scale theo ý muốn
        this.scene.add(this.shoeModel);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }
  private onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.prevMouse.x = event.clientX;
    this.prevMouse.y = event.clientY;
  }

  private onMouseUp(): void {
    this.prevMouse.x = 0;
    this.prevMouse.y = 0;
  }

  private onMouseMove(event: MouseEvent): void {
    event.preventDefault();
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;

    if (this.prevMouse.x && this.prevMouse.y) {
      const deltaX = this.mouse.x - this.prevMouse.x;
      this.shoeModel.rotation.y += deltaX * 0.01;
    }

    this.prevMouse.x = this.mouse.x;
    this.prevMouse.y = this.mouse.y;
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    if (this.shoeModel) {
      this.shoeModel.rotation.y += 0.01; // Rotate the shoe
    }
    this.renderer.render(this.scene, this.camera);
  }
}
