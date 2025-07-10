import satori from 'satori'
import { SITE } from '@/config'
import loadGoogleFonts from '../loadGoogleFont'

export default async (post) => {
  return satori(
    {
      type: 'div',
      props: {
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Noto Sans JP, IBM Plex Mono',
          position: 'relative',
        },
        children: [
          // 装飾用の図形
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '0',
                right: '0',
                width: '300px',
                height: '300px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0 0 0 300px',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '0',
                left: '0',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0 200px 0 0',
              },
            },
          },
          // メインカード
          {
            type: 'div',
            props: {
              style: {
                background: 'rgba(255, 255, 255, 0.98)',
                borderRadius: '32px',
                boxShadow: '0 32px 80px rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '40px',
                margin: '60px',
                width: '1080px',
                height: '480px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              },
              children: [
                // トップセクション - バッジ
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '30px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            background:
                              'linear-gradient(135deg, #ff6b6b, #feca57)',
                            padding: '14px 28px',
                            borderRadius: '50px',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: '700',
                            letterSpacing: '1px',
                            fontFamily: 'Noto Sans JP',
                            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                          },
                          children: '投稿',
                        },
                      },
                    ],
                  },
                },
                // タイトルセクション
                {
                  type: 'div',
                  props: {
                    style: {
                      flex: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      padding: '20px 40px',
                      overflow: 'hidden',
                    },
                    children: {
                      type: 'h1',
                      props: {
                        style: {
                          fontSize:
                            post.data.title.length > 50
                              ? '32px'
                              : post.data.title.length > 30
                                ? '38px'
                                : '44px',
                          fontWeight: '900',
                          lineHeight: '1.3',
                          margin: '0',
                          background:
                            'linear-gradient(135deg, #667eea, #764ba2)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          maxWidth: '950px',
                          overflow: 'hidden',
                          display: 'block',
                          textOverflow: 'ellipsis',
                          wordBreak: 'break-word',
                          maxHeight: '280px',
                          fontFamily: 'Noto Sans JP',
                        },
                        children: post.data.title,
                      },
                    },
                  },
                },
                // ボトムセクション
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '30px',
                      borderTop: '2px solid #f0f0f0',
                      marginTop: '20px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            color: '#666666',
                            fontSize: '28px',
                            fontWeight: '600',
                            fontFamily: 'Noto Sans JP',
                          },
                          children: post.data.author || 'Author',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            background:
                              'linear-gradient(135deg, #667eea, #764ba2)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fontSize: '36px',
                            fontWeight: '800',
                            fontFamily: 'Noto Sans JP',
                          },
                          children: SITE.title,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(
        `${post.data.title}${post.data.author || 'Author'}${SITE.title}投稿`,
      ),
    },
  )
}
