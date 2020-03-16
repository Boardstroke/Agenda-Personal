 # COISAS A MELHOR 🚴 <h1>

Vuex implementação 🙋‍♂️

1. Alterar todos eventos para responder através do vuex e não mais atráves de eventos bus: ♻️

	* [✔️] Agenda
	* [❌] Editar evento
	* [✔️] Criar evento

2. Estrutura que a Agenda deve seguir para atualizar eventos a partir de mudanças automáticas no servidor através do vuex e não mais atráves de eventos bus: ♻️

	* [✔️] Assim que os componentes são criados devemos fazer a requisão para o servido

	``` js
	created(){
		this.$store.dispatch('eventos/index)
	}
	```

	* [✔️] Agora para atualizar os eventos usamos a propriedade computed do vue e mapState

	``` js
	computed:{
		...mapState({
			eventos: state => state.eventos.event
		})
	}
	```

	* [✅] E finalmente para criar e editar eventos usar mapActions:

	``` js
	computed:{
		...mapActions("eventos", ["criar"])  // -> this.criar()
	}
	```

3. Entender Melhor REST 💻️:

	* Qual é melhor forma de responder as requisões?
		[] .toJSON?
		[] raw

	* Qual o padrão pra lidar com erros? No momento estou usando console.log() para mostrar o erro

# Descobertas  📑 <h2>

Usar `...mapAction("module", ["function"]` então `this.function()` invés de `this.state.commit("module/function", "payload")`