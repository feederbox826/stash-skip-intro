> [!WARNING]
> Removed in favor of user-defined local times
> https://github.com/feederbox826/plugins/commit/0781453f45e3f70939abab59243fdd6ff9ed9e5d

# stash-skip intro database

database for [skip-intro](https://github.com/feederbox826/plugins/tree/main/plugins/skip-intro) plugin

feel free to make requests in the [issues](https://github.com/feederbox826/stash-skip-intro/issues)

## contributing

in the case of any historical changes, the most recent and consistent end time will be taken.

if intro use is inconsistent or consistently varies, the shortest duration one is used

To determine the time to skip, use this console command after pausing to skip to the times. Increments of 0.1 are usually precise enough

```js
document.querySelector("video-js>video").currentTime = 12
```