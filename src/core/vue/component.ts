/*!
 * This file is part of `common` module.
 *
 * Authors:
 *      jason <jasonsoop@gmail.com>
 *
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved.
 */

import Vue from "vue";
import flagwind from "@egova/flagwind-core";
import { Message, Notice, Spin, ModalInstance } from "view-design";

/**
 * 定义组件的基础功能。
 * @class
 * @version 1.0.0
 */
export class Component extends Vue {
    protected _eventNames: Array<string> = [];

    protected get $eventNames() {
        if (this._eventNames === undefined) {
            this._eventNames = [];
        }
        return this._eventNames;
    }

    /**
     * 获取默认服务容器实例。
     * @protected
     * @property
     * @returns flagwind.IServiceProvider
     */
    protected get serviceProvier(): flagwind.IServiceProvider {
        return flagwind.ServiceProviderFactory.instance.default;
    }

    /**
     * 获取一个全局消息提示框实例。
     * @returns Message
     */
    protected get $message(): Message {
        return this.$Message;
    }

    /**
     * 获取一个全局模态框实例。
     * @returns Modal
     */
    protected get $modal(): ModalInstance {
        return this.$Modal;
    }

    /**
     * 获取一个全局通知提醒实例。
     * @returns Notice
     */
    protected get $notice(): Notice {
        return this.$Notice;
    }

    /**
     * 获取一个全局加载中组件实例。
     * @returns Spin
     */
    protected get $spin(): Spin {
        return this.$Spin;
    }
}
