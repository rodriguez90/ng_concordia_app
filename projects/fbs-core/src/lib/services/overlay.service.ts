import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class OverlayService {

    private isBusySubject = new BehaviorSubject<boolean>(false);
    public  isBusy$ =  this.isBusySubject.asObservable();

    constructor(private overlay: Overlay) { }

    createOverlay(config: AppOverlayConfig): OverlayRef {
        return this.overlay.create(config);
    }

    attachTemplatePortal(overlayRef: OverlayRef, templateRef: TemplateRef<any>, vcRef: ViewContainerRef) {
        let templatePortal = new TemplatePortal(templateRef, vcRef);
        overlayRef.attach(templatePortal);
    }

    positionGloballyCenter(): PositionStrategy {
        return this.overlay.position()
            .global()
            // .top()
            // .right();
            .centerHorizontally()
            .centerVertically();
    }

    setBusy(value: boolean) {
        this.isBusySubject.next(value);
    }
}

export interface AppOverlayConfig extends OverlayConfig { }
