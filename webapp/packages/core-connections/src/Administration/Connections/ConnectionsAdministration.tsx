/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { observer } from 'mobx-react';
import styled, { css, use } from 'reshadow';

import { AdministrationTools, AdministrationItemContentProps } from '@cloudbeaver/core-administration';
import { Loader, IconButton } from '@cloudbeaver/core-blocks';
import { useController } from '@cloudbeaver/core-di';
import { useStyles, composes } from '@cloudbeaver/core-theming';

import { ConnectionsAdministrationController } from './ConnectionsAdministrationController';
import { ConnectionsTable } from './ConnectionsTable/ConnectionsTable';
import { CreateConnection } from './CreateConnection/CreateConnection';

const styles = composes(
  css`
    AdministrationTools, layout-grid-cell {
      composes: theme-background-surface theme-text-on-surface from global;
    }

    layout-grid-cell {
      composes: theme-border-color-background from global;
    }
  `,
  css`
    layout-grid {
      width: 100%;
      flex: 1;
    }

    layout-grid-inner {
      min-height: 100%;
    }

    layout-grid-cell {
      position: relative;
      border: solid 1px;
    }

    AdministrationTools {
      display: flex;
      padding: 0 16px;
      align-items: center;
    }

    IconButton {
      height: 32px;
      width: 32px;
      margin-right: 16px;
    }

    actions {
      padding: 0 12px;
      padding-right: 24px;
    }
  `
);

export const ConnectionsAdministration = observer(function ConnectionsAdministration({
  sub,
  param,
  configurationWizard,
}: AdministrationItemContentProps) {
  const controller = useController(ConnectionsAdministrationController);

  return styled(useStyles(styles))(
    <layout-grid as="div">
      <layout-grid-inner as="div">
        <layout-grid-cell as='div' {...use({ span: 12 })}>
          <AdministrationTools>
            <IconButton name="add" viewBox="0 0 28 28" onClick={controller.create} />
            <IconButton name="trash" viewBox="0 0 28 28" onClick={controller.delete} />
            <IconButton name="reload" viewBox="0 0 28 28" onClick={controller.update} />
          </AdministrationTools>
          {sub && (
            <CreateConnection
              method={param || 'driver'}
              configurationWizard={configurationWizard}
              onChange={controller.setCreateMethod}
              onCancel={controller.cancelCreate}
            />
          )}
          <ConnectionsTable
            connections={controller.connections}
            selectedItems={controller.selectedItems}
            expandedItems={controller.expandedItems}
          />
          {controller.isLoading && <Loader overlay/>}
        </layout-grid-cell>
      </layout-grid-inner>
    </layout-grid>
  );
});
