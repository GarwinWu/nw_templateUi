<!-- FoldingBox折叠框组件
	<nw-folding-box>
		<div slot="topRIconSlot"></div>
		<div slot="boxCenten">
			<div>123123132</div>
			<div>123123132</div>
			<div>123123132</div>
			<div>123123132</div>
		</div>
		<div slot="botIconSlot"></div>
	</nw-folding-box>
 -->
<template>
	<div class="yw-folding">
		<div class="box p15 bg-white">
			<div class="box-title folding-row al-c ">
				<div class="flex-1 f14 fw" :class="[showBs?'borc-l-1e8 pl5':'']">{{titleName}}</div>
				<div class="icontrans" @click="showBox = !showBox" :class="[showBox?'showRotate':'']">
					<slot name="topRIconSlot">
            <!-- :class="[showBox?'txt-1e8':'gray9']" -->
						<i :class="[showBox?'txt-1e8':'gray9']" class="iconfont icon-sanjiao1 f12 "></i>
					</slot>
				</div>
			</div>
			<div class="pt15" v-show="showBox">
				<slot name="boxCenten"></slot>
			</div>
			<slot name="botIconSlot">
				<div :class="[showBox?'txt-1e8':'gray9']" class="folding-row al-c ju-c pt15 txt-1e8">
					<div class="mr5"  @click="showBox = !showBox">{{showBox?'收起':'展开'}}</div>
					<div class="icontrans" @click="showBox = !showBox" :class="[showBox?'showRotate':'']">
						<i class="iconfont icon-qianjin-copy  f12"></i>
					</div>
				</div>
			</slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'FoldingBox',
		display: 'FoldingBox折叠框组件',
		data() {
			return {
				showBox: this.foldShowBox,
				showBs: this.foldShowBs,
			}
		},
		props: {
      titleName:{
        type: String,
        default: '标题'
      },
			foldShowBox: { //显示折叠层，默认为true显示，false隐藏
				type: Boolean,
				default: true
			},
			foldShowBs: { //显示折叠层标题左侧标签，默认为true显示，false隐藏
				type: Boolean,
				default: true
			}
		},
		computed: {

		},
		methods: {

		},
	}
</script>

<style scoped lang="less">
	@import "../../assets/less/nw_tool.less";
	.yw-folding{
		width: 100%;
		text-align: left;
	}
	.box{
		width: 100%;
	}
	.folding-row{
		display: flex;
		flex-direction: row;
	}
	.icontrans {
		transition: all 0.3s;
		transform: rotate(0deg);

	}
	.showRotate {
		transform: rotate(180deg);
	}
	.borc-l-1e8{
		border-left: 0.08rem solid #1E87F0;
	}
	.txt-1e8{
		color: #1E87F0;
	}
	.boxs{
		box-shadow: 0.62rem 0.62rem 0.62rem 0.62rem rgba(0,0,0,0.2);
	}
</style>
