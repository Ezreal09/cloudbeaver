/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import styled, { use, css } from 'reshadow';

import { useStyles, composes } from '@cloudbeaver/core-theming';

const styles = composes(
  css`
    layout-grid-cell {
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
      padding: 16px 24px
    }
  `
);

export function WelcomePage() {
  return styled(useStyles(styles))(
    <layout-grid as="div">
      <layout-grid-inner as="div">
        <layout-grid-cell as='div' {...use({ span: 12 })}>
          <h3>Welcome to initial server configuration</h3>
          <p>Here you can configure something...</p>
        </layout-grid-cell>
      </layout-grid-inner>
    </layout-grid>
  );
}
