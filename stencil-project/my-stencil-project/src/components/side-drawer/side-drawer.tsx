import { Component, h } from "@stencil/core";

@Component({
    tag: 'uc-side-drawer',
    styleUrl: './side-drawer.css'
})

export class SideDrawer {
    render() {
        return (
            <aside>
                <h1>The Side Drawer</h1>
            </aside>
    )}
}