# NotifySSRankChanged
ScoreSaberの順位が変動した時にiOSで通知を出すスクリプト。

## How to download
iOSのみ対応で、アンドロイドは非対応です。  
iOSの[Scriptable](https://scriptable.app)というアプリが必要です。  
また、ファイルアプリとiCloudが連携している必要があります。  
Scriptableのダウンロード後は、[Release](https://github.com/rakkyo150/NotifySSRankChanged/releases)の.scriptableファイルをダウンロードしてください。  
その後、ファイルアプリのダウンロードフォルダに先ほどダウンロードしたscriptableファイルがあるはずなので、それを長押しして共有を押しましょう。  
共有先にScriptableアプリがあるのでそれを選択して、Add to My Scriptsを押せば取り込みは完了です。  

## Initial setting
### Scriptableの設定
scriptableファイルの取り込みが終わったら、scriptableアプリで取り込んだscriptableファイルに設定を入力する必要があります。  
スクリプト一覧でNotifySSRankChangedスクリプトの"..."を押して編集画面に移行してください。  
編集画面の最初の法にある`playerId`の値をご自身のplayerIdに書き換えてください。  
デフォルトではローカルランクの変動に対応する形にしていますが、グローバルランクでも動きます。  
方法としては、`//`でコメントアウトしている行の`//`を消して、その下の行(`nowRank`で始まってるところ)の先頭に`//`を追加してコメントアウトすれば、オッケーです。  
左上の"Done"を押してスクリプト一覧に戻りましょう。

### Scriptableのテスト
スクリプト一覧に戻ったらNotifySSRankChangedスクリプトをタップしてみてください。  
通知の許可がされてなかったら通知の許可をだすように出てくるので、許可しましょう。  
そうすると、"First Run"というタイトルの通知がでてくると思います。  
その後にファイルアプリからScriptableフォルダを見てみると、ScoreSaberRankingというフォルダができているのが確認できます。  
その中にはyourRanking.txtというテキストファイルが生成されており、その中にご自身のランクが表示されているはずです。

### ショートカットの設定
このままだと毎回スクリプトを手動で実行する必要があるので、ショートカットアプリで自動化しましょう。  
もし所持していなかったらApp Storeでダウンロードしましょう。  
ショートカットアプリのオートメーションタブで"個人用オートメーションを作成"をタップしましょう。  
"時刻"からお好きな時刻を選択して、毎日繰り返しになっているのを確認して"次へ"を押しましょう。  
アクションを選択からScriptableを検索して選択、"Run Scripts"から"NotifySSRankChanged"を選択してください。  
"次へ"を押したら、"実行前に尋ねる"をオフにして"完了"を押しましょう。
これで自動化できました。  
もっと頻繁に通知したい人は、オートメーションを増やしましょう。  


## For Developers
このプロジェクトではTypeScriptを使用しています。  
通常のTypeScript実行環境はググって整えてください。    
その後は、[こちら](https://github.com/gebeto/scriptables)のリポジトリをクローンしましょう。  
shファイルでinitしたら、sourcesにtsファイル移しましょう(リンク貼るのでもうまくいくかも？)。  
最後に`tsc --watch`をターミナルで実行すればいいかんじで動くと思います。  
細かい説明は先ほどのリポジトリのREADMEを読みましょう。  
