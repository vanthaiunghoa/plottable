///<reference path="../reference.ts" />

module Plottable {
export module Components {
  export class Group extends ComponentContainer {

    /**
     * Constructs a Component.Group.
     *
     * A Component.Group is a set of Components that will be rendered on top of
     * each other. When you call Component.above(Component) or Component.below(Component),
     * it creates and returns a Component.Group.
     *
     * Note that the order of the components will determine placement on the z-axis,
     * with the previous items rendered below the later items.
     *
     * @constructor
     * @param {Component[]} components The Components in the resultant Component.Group (default = []).
     */
    constructor(components: Component[] = []) {
      super();
      this.classed("component-group", true);
      components.forEach((c: Component) => this.add(c));
    }

    public _requestedSpace(offeredWidth: number, offeredHeight: number): _SpaceRequest {
      var requests = this.components().map((c: Component) => c._requestedSpace(offeredWidth, offeredHeight));
      return {
        minWidth: Utils.Methods.max<_SpaceRequest, number>(requests, (request: _SpaceRequest) => request.minWidth, 0),
        minHeight: Utils.Methods.max<_SpaceRequest, number>(requests, (request: _SpaceRequest) => request.minHeight, 0)
      };
    }

    public _merge(c: Component, below: boolean): Group {
      this.add(c, !below);
      return this;
    }

    public computeLayout(origin?: Point, availableWidth?: number, availableHeight?: number) {
      super.computeLayout(origin, availableWidth, availableHeight);
      this.components().forEach((c) => {
        c.computeLayout({ x: 0, y: 0 }, this.width(), this.height());
      });
      return this;
    }

    protected _getSize(availableWidth: number, availableHeight: number) {
      return {
        width: availableWidth,
        height: availableHeight
      };
    }

    public _isFixedWidth(): boolean {
      return this.components().every((c) => c._isFixedWidth());
    }

    public _isFixedHeight(): boolean {
      return this.components().every((c) => c._isFixedHeight());
    }
  }
}
}
