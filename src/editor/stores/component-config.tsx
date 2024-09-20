import { create } from "zustand";
import ContainerDev from "../materials/Container/dev";
import ContainerProd from "../materials/Container/prod";
import ButtonDev from "../materials/Button/dev";
import ButtonProd from "../materials/Button/prod";
import PageDev from "../materials/Page/dev";
import PageProd from "../materials/Page/prod";
import ModalDev from "../materials/Modal/dev";
import ModalProd from "../materials/Modal/prod";
import TableDev from "../materials/Table/dev";
import TableProd from "../materials/Table/prod";
import TableColumnDev from "../materials/TableColumn/dev";
import TableColumnProd from "../materials/TableColumn/prod";
import FormDev from "../materials/Form/dev";
import FormProd from "../materials/Form/prod";
import FormItemDev from "../materials/FormItem/dev";
import FormItemProd from "../materials/FormItem/prod";
import FlexContainerDev  from "../materials/FlexContainer/dev";
import FlexContainerProd from "../materials/FlexContainer/prod";
import ImageDev from "../materials/Image/dev";
import ImageProd from "../materials/Image/prod";

export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

export interface ComponentEvent {
  name: string;
  label: string;
}
export interface ComponentMethod {
  name: string;
  label: string;
}
export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>;
  desc: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  events?: ComponentEvent[];
  methods?: ComponentMethod[];
  canFlowEdit?: boolean;
  dev: any;
  prod: any;
}

interface State {
  componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {
    Page: {
      name: "Page",
      defaultProps: {},
      desc: "页面",
      dev: PageDev,
      prod: PageProd,
    },
    Container: {
      name: "Container",
      defaultProps: {},
      stylesSetter: [
        {
          name: "width",
          label: "宽度",
          type: "inputNumber",
        },
        {
          name: "height",
          label: "高度",
          type: "inputNumber",
        },
        
      ],
      desc: "容器",
      dev: ContainerDev,
      prod: ContainerProd,

    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      setter: [
        {
          name: "type",
          label: "按钮类型",
          type: "select",
          options: [
            { label: "主按钮", value: "primary" },
            { label: "次按钮", value: "default" },
          ],
        },
        {
          name: "text",
          label: "文本",
          type: "input",
        },
      ],
      stylesSetter: [
        {
          name: "width",
          label: "宽度",
          type: "inputNumber",
        },
        {
          name: "height",
          label: "高度",
          type: "inputNumber",
        },
      ],
      events: [
        {
          name: 'onClick',
          label: '点击事件'
        },
        {
          name: 'onDoubleClick',
          label: '双击事件'
        },
      ],
      canFlowEdit: false,
      desc: "按钮",
      dev: ButtonDev,
      prod: ButtonProd,
    },
    Modal: {
      name: 'Modal',
      defaultProps: {
          title: '弹窗'
      },
      setter: [
          {
            name: 'title',
            label: '标题',
            type: 'input'
          }
      ],
      stylesSetter: [],
      events: [
          {
              name: 'onOk',
              label: '确认事件',
          },
          {
              name: 'onCancel',
              label: '取消事件'
          },
      ],
      methods: [
        {
            name: 'open',
            label: '打开弹窗',
        },
        {
            name: 'close',
            label: '关闭弹窗'
        }
      ],
      canFlowEdit: false,
      desc: '弹窗',
      dev: ModalDev,
      prod: ModalProd
    },
    Table: {
      name: 'Table',
      defaultProps: {},
      desc: '表格',
      setter: [
          {
            name: 'url',
            label: 'url',
            type: 'input',
          },
      ],
      dev: TableDev,
      prod: TableProd
    },
    TableColumn: {
      name: 'TableColumn',
      desc: '表格列',
      defaultProps: {
          dataIndex:`col_${new Date().getTime()}`,
          title: '列名'
      },
      setter: [
          {
            name: 'type',
            label: '类型',
            type: 'select',
            options: [
              {
                label: '文本',
                value: 'text',
              },
              {
                label: '日期',
                value: 'date',
              },
            ],
          },
          {
            name: 'title',
            label: '标题',
            type: 'input',
          },
          {
            name: 'dataIndex',
            label: '字段',
            type: 'input',
          },
        ],
      dev: TableColumnDev,
      prod: TableColumnProd,
    },
    Form: {
      name: 'Form',
      defaultProps: {},
      desc: '表单',
      setter: [
          {
              name: 'title',
              label: '标题',
              type: 'input',
          },
      ],
      events: [
          {
              name: 'onFinish',
              label: '提交事件',
          }
      ],
      methods: [
        {
            name: 'submit',
            label: '提交',
        }
    ],    
      dev: FormDev,
      prod: FormProd
    },
    FormItem: {
    name: 'FormItem',
    desc: '表单项',
    defaultProps: {
        name: new Date().getTime(),
        label: '姓名'
    },
    dev: FormItemDev,
    prod: FormItemProd,
    setter: [
      {
        name: 'type',
        label: '类型',
        type: 'select',
        options: [
          {
            label: '文本',
            value: 'input',
          },
          {
            label: '日期',
            value: 'date',
          },
        ],
      },
      {
        name: 'label',
        label: '标题',
        type: 'input',
      },
      {
        name: 'name',
        label: '字段',
        type: 'input',
      },
      {
        name: 'rules',
        label: '校验',
        type: 'select',
        options: [
          {
            label: '必填',
            value: 'required',
          },
        ],
      }
    ]
    },
    FlexContainer: {
      name: 'FlexContainer',
      desc: '弹性布局容器',
      defaultProps: {
        flex: 'flex',
        vertical: false,
        gap: 'middle',
        wrap: true,
        justify: 'start',
        align: 'start'
      },
      dev: FlexContainerDev,
      prod: FlexContainerProd,
      setter: [
        {
          name: 'vertical',
          label: '方向',
          type: 'select',
          options: [
            { label: '水平', value:false },
            { label: '垂直', value:true }
          ]
        },
        {
          name: 'gap',
          label: '间距',
          type: 'select',
          options: [
            { label: '小', value:'small' },
            { label: '中', value:'middle' },
            { label: '大', value:'large' }
          ]
        },
        {
          name: 'wrap',
          label: '自动换行',
          type: 'select',
          options: [
            { label: '换行', value:true },
            { label: '不换行', value:false },
          ]
        },
        {
          name: 'justify',
          label: '主轴对齐方式',
          type: 'select',
          options: [
            { label: '居首', value:'start' },
            { label: '居中', value:'center' },
            { label: '居尾', value:'end' },
            { label: '均分', value:'space-between' },
          ]
        },
        {
          name: 'align',
          label: '侧轴对齐方式',
          type: 'select',
          options: [
            { label: '居首', value:'start' },
            { label: '居中', value:'center' },
            { label: '居尾', value:'end' },
          ]
        }
      ],
      stylesSetter: [
        {
          name: "width",
          label: "宽度",
          type: "inputNumber",
        },
        {
          name: "height",
          label: "高度",
          type: "inputNumber",
        },
      ]

    },
    Image: {
      name: 'Image',
      desc: '图片',
      defaultProps: {
        src: '/vite.svg',
        altText: '图片描述',
      },
      setter: [
        {
          name: 'src',
          label: '图片路径',
          type: 'input',
        },
        {
          name: 'altText',
          label: '图片描述',
          type: 'input',
        },
      ],
      stylesSetter: [
        {
          name: "width",
          label: "宽度",
          type: "inputNumber",
        },
        {
          name: "height",
          label: "高度",
          type: "inputNumber",
        },
      ],
      dev: ImageDev,
      prod: ImageProd,
    }
  },

  registerComponent: (name, componentConfig) =>
    set((state) => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      };
    }),
}));
