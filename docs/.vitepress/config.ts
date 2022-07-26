import { defineConfig } from 'vitepress'
import renderPermaLink from './render-perma-link'
import MarkDownItCustomAnchor from './markdown-it-custom-anchor'

const ogDescription = 'ant-design-vue 业务组件库'

export default defineConfig({
  title: 'Vself 官方文档',
  description: 'ant-design-vue 业务组件库',
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:description', content: 'ant-design-vue 业务组件库' }],
  ],

  vue: {
    reactivityTransform: true
  },

  themeConfig: {
    logo: '/logo.svg',

    editLink: {
      text: '为此页提供修改建议',
      pattern: 'https://github.com/facexl/vself',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/facexl/vself' }
    ],

    algolia: {
      appId: 'BH4D9OD16A',
      apiKey: 'b573aa848fd57fb47d693b531297403c',
      indexName: 'vitejs',
      searchParameters: {
        facetFilters: ['tags:cn']
      }
    },

    // localeLinks: {
    //   text: '简体中文',
    //   items: [
    //     { text: 'English', link: 'https://vitejs.dev' },
    //     { text: '日本語', link: 'https://ja.vitejs.dev' },
    //     { text: 'Español', link: 'https://es.vitejs.dev' }
    //   ]
    // },

    footer: {
      message: '根据 MIT 许可证发布',
      copyright: 'Copyright © 2019-present'
    },

    nav: [
      { text: '指引', link: '/guide/', activeMatch: '/guide/' },
      { text: '组件', link: '/components/', activeMatch: '/components/' },
      { text: 'hooks', link: '/hooks/', activeMatch: '/hooks/' },
      {
        text: '相关链接',
        items: [
          {
            text: 'vite',
            link: 'https://vitejs.cn/'
          },
          {
            text: 'vue3',
            link: 'https://v3.cn.vuejs.org/guide/introduction.html'
          },
          { text: 'ant-design-vue', link: 'https://www.antdv.com/docs/vue/introduce-cn' },
          {
            text: 'Rollup 插件兼容',
            link: 'https://vite-rollup-plugins.patak.dev/'
          },
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指引',
          items: [
            {
              text: '开始',
              link: '/guide/'
            },
            {
              text: '注意事项',
              link: '/guide/notice'
            }
          ]
        },
        // {
        //   text: 'API',
        //   items: [
        //     {
        //       text: '插件 API',
        //       link: '/guide/api-plugin'
        //     },
        //     {
        //       text: 'HMR API',
        //       link: '/guide/api-hmr'
        //     },
        //     {
        //       text: 'JavaScript API',
        //       link: '/guide/api-javascript'
        //     },
        //     {
        //       text: '配置参考',
        //       link: '/config/'
        //     }
        //   ]
        // }
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            {
              text: '组件',
              link: '/components/'
            },
            {
              text: 'Seach',
              link: '/components/search'
            },
          ]
        }
      ],
      '/hooks/': [
        {
          text: 'hooks',
          items: [
            {
              text: 'hooks',
              link: '/hooks/'
            },
            {
              text: 'useColumn',
              link: '/hooks/useColumn'
            },
          ]
        }
      ]
    }
  },

  markdown: {
    anchor: {
      permalink: renderPermaLink,
    },
    config: (md) => {
      md.use(MarkDownItCustomAnchor)
    }
  }
})
